import http from 'http';
import serveHandler from 'serve-handler';

const server = http.createServer((request, response) => {
  return serveHandler(request, response, {
    public: 'dist', // 정적 파일 폴더 설정
    rewrites: [
      { source: '/static/**', destination: '/static/' },
      { source: '**', destination: '/index.html' },
    ],
    cleanUrls: false,
  });
});

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080');
});
