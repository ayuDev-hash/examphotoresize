document.addEventListener('DOMContentLoaded', async function () {
  function setText(id, value) {
    var el = document.getElementById(id);
    if (el && value !== undefined && value !== null) {
      el.textContent = value;
    }
  }

  function setMeta(selector, value) {
    var el = document.querySelector(selector);
    if (el && value) {
      el.setAttribute('content', value);
    }
  }

  try {
    var fileName = window.location.pathname.split('/').pop();
    if (!fileName || fileName === '') fileName = 'index.html';

    var slug = fileName.replace('.html', '');
    var response = await fetch('/content/pages/' + slug + '.json', {
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error('Content file not found for ' + slug);
    }

    var data = await response.json();

    if (data.seoTitle) document.title = data.seoTitle;
    setMeta('meta[name="description"]', data.seoDescription);
    setMeta('meta[name="keywords"]', data.seoKeywords);
    setMeta('meta[property="og:title"]', data.ogTitle || data.seoTitle);
    setMeta('meta[property="og:description"]', data.ogDescription || data.seoDescription);
    setMeta('meta[name="twitter:title"]', data.twitterTitle || data.seoTitle);
    setMeta(
      'meta[name="twitter:description"]',
      data.twitterDescription || data.seoDescription
    );

    setText('announcementText', data.announcementText);
    setText('heroTitleLine1', data.heroTitleLine1);
    setText('heroTitleGradient', data.heroTitleGradient);
    setText('heroHighlight1', data.heroHighlight1);
    setText('heroHighlight2', data.heroHighlight2);
    setText('heroDescriptionTail', data.heroDescriptionTail);
    setText('userCount', data.userCount);
    setText('heroNote', data.heroNote);
    setText('panelTitle', data.panelTitle);

    setText('toolSectionTitle', data.toolSectionTitle);
    setText('toolSectionDesc', data.toolSectionDesc);

    setText('examsSectionTitle', data.examsSectionTitle);
    setText('examsSectionDesc', data.examsSectionDesc);

    setText('howToSectionTitle', data.howToSectionTitle);
    setText('faqSectionTitle', data.faqSectionTitle);
    setText('privacySectionTitle', data.privacySectionTitle);

    setText('footerAbout', data.footerAbout);
    setText('footerCopyright', data.footerCopyright);
  } catch (err) {
    console.log('CMS content load skipped:', err.message);
  }
});
