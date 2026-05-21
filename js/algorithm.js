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

// 移除Node.js模块导出，浏览器环境不需要
