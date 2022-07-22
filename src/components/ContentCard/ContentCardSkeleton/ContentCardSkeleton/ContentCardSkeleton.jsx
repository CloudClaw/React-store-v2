import ContentLoader from 'react-content-loader';

export const ContentCardSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={500}
    height={500}
    viewBox="0 0 500 500"
    backgroundColor="#d8d4d4"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="64" y="47" rx="5" ry="5" width="250" height="306" />
    <rect x="191" y="356" rx="0" ry="0" width="125" height="30" />
    <rect x="62" y="356" rx="0" ry="0" width="125" height="30" />
  </ContentLoader>
);
