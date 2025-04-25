export default function sitemap() {
  // Define the base URL for your site.
  // It's best practice to store this in environment variables, but for simplicity:
  const baseUrl = 'https://videowordsearch.com';

  // Get the current date for lastModified. You could also use specific dates
  // if you know when content was last updated.
  const lastModified = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: 'monthly', // How often the content is likely to change
      priority: 1.0, // Priority relative to other URLs on your site (1.0 is highest)
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastModified, // Or the specific date the privacy policy was last updated
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    // Add entries for other static pages if/when they are created (e.g., /about, /contact)
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: lastModified,
    //   changeFrequency: 'yearly',
    //   priority: 0.7,
    // },
  ];
}
