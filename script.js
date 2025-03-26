document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
      const container = video.parentElement;
      const spinner = container.querySelector('.spinner-border');
      
      video.addEventListener('waiting', () => {
        spinner.style.display = 'block';
      });
      
      video.addEventListener('canplay', () => {
        spinner.style.display = 'none';
      });
      
      video.addEventListener('error', () => {
        spinner.style.display = 'none';
      });
    });
  });