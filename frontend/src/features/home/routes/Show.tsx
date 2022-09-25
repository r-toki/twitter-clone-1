import { Layout } from '../components';
import { LeftSideBar } from '../components/LeftSideBar';

export const Show = () => {
  return <Layout left={<LeftSideBar />} main={null} right={null}></Layout>;
};
