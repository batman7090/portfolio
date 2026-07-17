export const projects = [
  {
    slug: 'multi-utility-rag-chatbot',
    title: 'Multi-Utility RAG Chatbot',
    summary:
      'A LangGraph chatbot that chats with your PDFs, looks up stock prices, and does math  with per-thread document context and SQLite-persisted conversations.',
    tags: ['LangGraph', 'RAG', 'FAISS', 'Python'],
    year: 2025,
    status: 'Shipped',
    featured: true,
    cover: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&w=1600&q=70',
    github: 'https://github.com/batman7090/rag_chatbot',
    demo: 'https://rag-chatbot-shamanth-demo.streamlit.app/',
    stack: ['LangGraph', 'FAISS', 'OpenAI API', 'Streamlit', 'SQLite'],
    body: [
      'A single LLM node paired with a tool node lets the model decide when to reach for a calculator or an Alpha Vantage stock lookup, while the UI surfaces live tool-status indicators as replies stream in.',
      'Each conversation is its own thread with its own FAISS index, so uploaded PDFs never leak context between chats. Threads are checkpointed in SQLite  named after the first thing you type  so past conversations survive restarts. Built on gpt-4o-mini with text-embedding-3-small.',
    ],
  },
  {
    slug: 'movie-recommender-system',
    title: 'Movie Recommender System (Content-Based Filtering)',
    summary:
      'A Streamlit web app that recommends movies using content-based filtering built from the TMDB 5000 Movies dataset.',
    tags: ['Machine Learning', 'Scikit-learn', 'Streamlit', 'Recommender System'],
    year: 2025,
    status: 'Shipped',
    featured: true,
    cover: 'https://github.com/batman7090/movie_recommender_system/blob/main/image.png?raw=true',
    github: 'https://github.com/batman7090/movie_recommender_system/tree/main',
    demo: '#',
    stack: ['Scikit-learn', 'Pandas', 'Streamlit', 'Docker'],
    body: [
      'A content-based recommender that suggests movies by similarity to a selected title, without relying on user ratings or viewing history. It combines key movie metadata into a single feature set, applies text preprocessing, vectorises with CountVectorizer, and uses cosine similarity to surface the closest matches.',
    ],
  },
]
