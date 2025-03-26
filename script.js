document.addEventListener('DOMContentLoaded', function() {
    // Process all videos on the page
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Create a container div for the video and spinner
        const container = document.createElement('div');
        container.className = 'video-container position-relative d-inline-block';
        
        // Create the Bootstrap spinner
        const spinner = document.createElement('div');
        spinner.className = 'spinner-border text-primary position-absolute top-50 start-50';
        spinner.setAttribute('role', 'status');
        spinner.style.display = 'none';
        spinner.innerHTML = '<span class="visually-hidden">Loading...</span>';
        
        // Wrap the video with the container
        video.parentNode.insertBefore(container, video);
        container.appendChild(spinner);
        container.appendChild(video);
        
        // Set up event listeners
        video.addEventListener('waiting', () => {
            spinner.style.display = 'block';
        });
        
        video.addEventListener('canplay', () => {
            spinner.style.display = 'none';
        });
        
        video.addEventListener('error', () => {
            spinner.style.display = 'none';
        });
        
        // Show spinner immediately if video isn't ready
        if (video.readyState < 3) { // 3 = HAVE_FUTURE_DATA
            spinner.style.display = 'block';
        }
    });
});