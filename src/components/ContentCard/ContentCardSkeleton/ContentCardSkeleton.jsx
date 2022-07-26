import ContentLoader from 'react-content-loader';

import styles from './ContentCardSkeleton.module.scss';

export const ContentCardSkeleton = (props) => (
  <ContentLoader
    className={styles.card}
    speed={2}
    viewBox="0 0 500 500"
    backgroundColor="#d8d4d4"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="64" y="47" rx="5" ry="5" width="300" height="410" />
    <rect x="215" y="460" rx="0" ry="0" width="150" height="30" />
    <rect x="63" y="460" rx="0" ry="0" width="150" height="30" />
  </ContentLoader>
);
