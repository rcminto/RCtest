/**
 * 人格测试匹配算法
 * 6维度版本：焦虑、社交、消费、作息、户外、情绪
 */

class PersonalityTest {
  constructor() {
    this.userScores = {}; // 用户6维度得分
    this.currentQuestion = 0;
    this.answers = [];
  }

  // 初始化所有维度为0分
  initDimensions() {
    const dimensions = [
      'anxiety',      // 焦虑指数
      'social',       // 社交活跃度
      'spending',     // 消费倾向
      'sleep',        // 作息规律
      'outdoor',      // 户外活动
      'emotion'       // 情绪稳定性
    ];

    dimensions.forEach(dim => {
      this.userScores[dim] = 0;
    });
  }

  // 回答问题，更新得分
  answerQuestion(question, answerIndex) {
    const answer = question.options[answerIndex];

    // 根据答案给各维度加分
    if (answer.dimensions) {
      for (const [dim, points] of Object.entries(answer.dimensions)) {
        this.userScores[dim] += points;
      }
    }

    this.answers.push({
      questionId: question.id,
      answerIndex: answerIndex
    });
    this.currentQuestion++;
  }

  // 计算余弦相似度
  cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (const key of Object.keys(vecA)) {
      dotProduct += vecA[key] * vecB[key];
      normA += Math.pow(vecA[key], 2);
      normB += Math.pow(vecB[key], 2);
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (normA * normB);
  }

  // 计算欧氏距离
  euclideanDistance(vecA, vecB) {
    let sum = 0;
    for (const key of Object.keys(vecA)) {
      sum += Math.pow(vecA[key] - vecB[key], 2);
    }
    return Math.sqrt(sum);
  }

  // 匹配人格类型
  matchPersonalityType(personalityTypes) {
    const results = [];

    for (const type of personalityTypes) {
      const similarity = this.cosineSimilarity(this.userScores, type.vector);
      const distance = this.euclideanDistance(this.userScores, type.vector);

      results.push({
        type: type,
        similarity: similarity,
        distance: distance,
        matchPercentage: Math.max(50, Math.round(similarity * 100))
      });
    }

    // 按相似度排序
    results.sort((a, b) => b.similarity - a.similarity);

    // Woody型特殊处理：如果和第二名差距太小，选第二名
    // 避免太多人被分到"中庸"的Woody型
    if (results[0].type.id === 'WOOD' && results.length > 1) {
      const gap = results[0].similarity - results[1].similarity;
      if (gap < 0.05) {  // 差距小于5%，选第二名
        results[0].matchPercentage -= 5;  // 降低Woody的匹配度
        [results[0], results[1]] = [results[1], results[0]];
      }
    }

    // 计算归一化百分比（所有人格占比总和为100%）
    const totalSimilarity = results.reduce((sum, r) => sum + r.similarity, 0);
    results.forEach(r => {
      r.percentage = Math.round((r.similarity / totalSimilarity) * 100);
      r.displayPercentage = r.percentage;
    });

    // 确保总和正好是100%（处理四舍五入误差）
    const totalPercent = results.reduce((sum, r) => sum + r.percentage, 0);
    if (totalPercent !== 100) {
      results[0].displayPercentage += (100 - totalPercent);
    }

    return {
      bestMatch: results[0],
      allMatches: results,
      userVector: this.userScores
    };
  }

  // 获取维度说明
  getDimensionLabels() {
    return {
      anxiety: '焦虑指数',
      social: '社交达人',
      spending: '氪金程度',
      sleep: '熬夜指数',
      outdoor: '户外活动',
      emotion: '情绪波动'
    };
  }

  // 重置测试
  reset() {
    this.initDimensions();
    this.currentQuestion = 0;
    this.answers = [];
  }
}

// ==================== 本地统计相关 ====================

function saveResultToLocal(typeId) {
  const results = JSON.parse(localStorage.getItem('personality_results') || '[]');
  results.push({
    type: typeId,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('personality_results', JSON.stringify(results));
}

function getStats() {
  const results = JSON.parse(localStorage.getItem('personality_results') || '[]');
  const stats = {};
  personalityTypes.forEach(type => {
    stats[type.id] = 0;
  });
  results.forEach(r => {
    if (stats[r.type] !== undefined) {
      stats[r.type]++;
    }
  });
  return {
    total: results.length,
    byType: stats
  };
}

// ==================== 后台数据统计相关 ====================

/**
 * 提交测试结果到后台
 * @param {string} resultType - 人格类型ID
 * @param {Object} scores - 用户各维度得分
 * @returns {Promise<boolean>} 是否成功
 */
async function submitResultToBackend(resultType, scores) {
  try {
    const response = await fetch('/.netlify/functions/save-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        resultType: resultType,
        scores: scores
      })
    });

    if (response.ok) {
      console.log('结果已提交到后台');
      return true;
    }
  } catch (error) {
    // 提交失败不影响用户体验，静默失败
    console.log('后台提交失败（可能是本地开发环境）:', error.message);
  }
  return false;
}

/**
 * 从后台获取全局统计数据
 * @returns {Promise<Object>} 统计数据
 */
async function getStatsFromBackend() {
  try {
    const response = await fetch('/.netlify/functions/get-stats');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('获取统计失败（可能是本地开发环境）:', error.message);
  }
  return null;
}

/**
 * 合并本地统计和后台统计
 * @returns {Promise<Object>} 合并后的统计
 */
async function getCombinedStats() {
  // 先尝试获取后台数据
  const backendStats = await getStatsFromBackend();

  // 获取本地统计（兼容旧版）
  const localStats = getStats();

  // 如果有后台数据，以后台数据为准
  if (backendStats && backendStats.stats && backendStats.stats.length > 0) {
    const statsMap = {};
    backendStats.stats.forEach(s => {
      statsMap[s.type] = s.count;
    });

    return {
      total: backendStats.total,
      byType: statsMap,
      source: 'backend'
    };
  }

  // 否则返回本地统计
  return {
    ...localStats,
    source: 'local'
  };
}
