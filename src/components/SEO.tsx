import { Helmet } from 'react-helmet-async';

const SEO = () => {
  const title = "Towhid Raihan | Student, Software & AI Engineer";
  const description = "Portfolio of Towhid Raihan, a Software Engineer specialising in full-stack development, data analysis, and artificial intelligence.";
  const url = "https://towhidraihan.dev"; // Need to configure my actual live domain later
  
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#050505" />

      {/* Open Graph / LinkedIn / Slack Previews */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}/og-image.jpg`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}/og-image.jpg`} />
    </Helmet>
  );
};

export default SEO;