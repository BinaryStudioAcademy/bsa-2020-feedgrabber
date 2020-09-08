import React, { FunctionComponent } from 'react';
import { Loader } from 'semantic-ui-react';

interface ILoaderWrapperProps {
  loading: boolean;
}

const LoaderWrapper: FunctionComponent<ILoaderWrapperProps> = ({ loading, children }) => (
  loading
    ? (
      <div style={{ position: 'relative', height: '100%' }}>
        <Loader active />
      </div>
    ) : (
      <>
        {children}
      </>
    )
);

export default LoaderWrapper;
