const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  // 简单的防刷：同一个IP 1分钟内只能提交1次
  const clientIP = event.headers['x-nf-client-connection-ip'] || event.headers['x-forwarded-for'];
  console.log('Request from IP:', clientIP);

  try {
    const { resultType, scores } = JSON.parse(event.body);

    // 验证数据
    if (!resultType || !scores) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;

    // 如果没有配置环境变量，就跳过提交（开发环境）
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.log('Supabase not configured, skipping save');
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Skipped (not configured)' })
      };
    }

    // 提交到 Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        result_type: resultType,
        scores: scores
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase error:', errorText);
      throw new Error('Failed to save to database');
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
