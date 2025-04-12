export const wordSearchResults = [
  {
    word: 'is',
    context: 'starter story welcome s',
    timestamp: '00:01:11',
    videoId: 'vid_001'
  },
  {
    word: 'is',
    context: 'this is how we build',
    timestamp: '00:02:15',
    videoId: 'vid_001'
  },
  {
    word: 'is',
    context: 'what is the main concept',
    timestamp: '00:03:45',
    videoId: 'vid_002'
  }
];

export const insightsResults = [
  {
    type: 'keyword',
    word: 'technology',
    occurrences: 15,
    timestamps: ['00:01:11', '00:02:30', '00:05:45'],
    context: 'Frequently mentioned in technical discussions'
  },
  {
    type: 'phrase',
    word: 'artificial intelligence',
    occurrences: 8,
    timestamps: ['00:03:20', '00:07:15'],
    context: 'Key topic in innovation segments'
  },
  {
    type: 'sentiment',
    word: 'positive',
    occurrences: 12,
    timestamps: ['00:01:00', '00:04:30'],
    context: 'Overall positive tone in presentation'
  }
];

export const autoSearchResults = [
  {
    category: 'Technical Terms',
    words: [
      {
        word: 'API',
        timestamp: '00:01:11',
        confidence: 0.95
      },
      {
        word: 'Database',
        timestamp: '00:02:30',
        confidence: 0.88
      }
    ]
  },
  {
    category: 'Key Concepts',
    words: [
      {
        word: 'Scalability',
        timestamp: '00:03:45',
        confidence: 0.92
      },
      {
        word: 'Performance',
        timestamp: '00:05:20',
        confidence: 0.87
      }
    ]
  }
]; 