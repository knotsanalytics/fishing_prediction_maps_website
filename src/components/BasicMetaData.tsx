import { Helmet } from "react-helmet-async";
import config from "../lib/config";

type Props = {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  url: string;
};
export default function BasicMeta({
  title,
  description,
  keywords,
  author,
  url,
}: Props) {
  return (
    <Helmet>
      <title>
        {title ? [title, config.site_title].join(" | ") : config.site_title}
      </title>
      <meta
        name="description"
        content={description ? description : config.site_description}
      />
      <meta
        name="keywords"
        content={
          keywords
            ? keywords.join(",")
            : config.site_keywords.map((it) => it).join(",")
        }
      />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <meta name="author" content={author ? author : config.author} />
      <link rel="canonical" href={config.base_url + url} />
      <link rel="icon" href="/favicon.svg" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#fefefe" />

      <meta property="og:title" content={title ? title : config.site_title} />
      <meta property="og:image" content="/sharePic.png" />
      <meta
        property="og:description"
        content={description ? description : config.site_description}
      />
      <meta property="og:url" content={config.base_url} />
    </Helmet>
  );
}
