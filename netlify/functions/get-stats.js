const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // 只允许 GET 请求
  if (event.httpMethod !== 'GET') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;

    // 如果没有配置环境变量，返回示例数据
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      console.log('Supabase not configured, returning demo stats');
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total: 0,
          stats: [],
          message: 'Database not configured yet'
        })
      };
    }

    // 从 Supabase 获取统计数据
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/results?select=result_type`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from database');
    }

    const data = await response.json();

    // 统计各类型数量
    const stats = {};
    data.forEach(item => {
      stats[item.result_type] = (stats[item.result_type] || 0) + 1;
    });

    // 转成数组格式方便前端用
    const statsArray = Object.entries(stats).map(([type, count]) => ({
      type,
      count
    }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        total: data.length,
        stats: statsArray
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
