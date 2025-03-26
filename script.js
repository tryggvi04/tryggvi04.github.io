document.addEventListener('DOMContentLoaded', function() {
    // First, add the spinner containers to all videos that don't have them
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Skip if already has a spinner container
        if (video.parentElement.classList.contains('video-container')) return;
        
        // Create container div
        const container = document.createElement('div');
        container.className = 'video-container position-relative d-inline-block';
        
        // Create spinner
        const spinner = document.createElement('div');
        spinner.className = 'spinner-border text-primary position-absolute top-50 start-50';
        spinner.setAttribute('role', 'status');
        spinner.style.display = 'none';
        
        // Add spinner to container
        container.appendChild(spinner);
        
        // Wrap the video with the container
        video.parentNode.insertBefore(container, video);
        container.appendChild(video);
    });

    // Now set up event listeners for all videos
    const allVideos = document.querySelectorAll('video');
    
    allVideos.forEach(video => {
        const container = video.parentElement;
        const spinner = container.querySelector('.spinner-border');
        
        // Show spinner when video is loading
        video.addEventListener('waiting', () => {
            if (spinner) spinner.style.display = 'block';
        });
        
        // Hide spinner when video can play
        video.addEventListener('canplay', () => {
            if (spinner) spinner.style.display = 'none';
        });
        
        // Hide spinner if there's an error
        video.addEventListener('error', () => {
            if (spinner) spinner.style.display = 'none';
        });
        
        // Show spinner initially while video loads
        if (spinner && video.readyState < 3) {
            spinner.style.display = 'block';
        }
    });
});