import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchDataRoutine } from 'screens/Home/routines';
import { IBindingAction } from 'models/Callbacks';
import { IData } from 'screens/Home/models/IData';

export interface IDataProps {
  data: IData;
  fetchData: IBindingAction;
}

const Data: React.FunctionComponent<IDataProps> = ({
  data,
  fetchData: getData
}) => {
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <h1>Inner component</h1>
      <span>Data loaded: </span>
      <span>{data.message}</span>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { data: { data } } = state;
  return {
    data
  };
};

const mapDispatchToProps = {
  fetchData: fetchDataRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Data);
