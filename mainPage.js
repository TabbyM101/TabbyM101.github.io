document.addEventListener('DOMContentLoaded', () => {
    /* Get all of the tabs an the content section */
    const tabs = document.querySelectorAll('.tab');
    const contentDiv = document.getElementById('content');
    const fakeUrl = document.querySelector('.fake-url');
  
    /* When a tab is clicked and open, set it to active */
    function highlightActiveTab(url) {
      tabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('href') === url);
      });
    }

    /* Change the current url in the fake search bar */
    function updateURL(url) {
        const cleanURL = url.replace('./Tabs/', '').replace('.html', '');
        fakeUrl.textContent = 'https://Tabbys-Portfolio/' + cleanURL
    }
  
    /* Load the given html page */
    function loadPage(url) {
      fetch(url)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load');
          return res.text();
        })
        .then(html => {
          contentDiv.innerHTML = html;
          highlightActiveTab(url);
          updateURL(url);
        })
        .catch(() => {
          contentDiv.innerHTML = '<p> Unable to load content </p>';
        });
    }
  
    /* Load about page on start */
    loadPage('./Tabs/about.html');
  
    /* Add listeners to the tabs */
    tabs.forEach(tab => {
      tab.addEventListener('click', e => {
        e.preventDefault();
        const url = tab.getAttribute('href');
        loadPage(url);
      });
    });
  });
  