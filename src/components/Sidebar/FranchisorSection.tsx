

import { Select } from 'antd';
import { useAppSelector, useAppDispatch } from '../../store/storeHooks';
import { selectWorkspaceList } from '../../store/slices/workspaceSlice';
import { setCurrentWorkspace, selectCurrentWorkspace } from '../../store/slices/authSlice';

const FranchisorSection = () => {

  const dispatch = useAppDispatch();
  const workspaceList = useAppSelector(selectWorkspaceList);
  const currentWorkspace = useAppSelector(selectCurrentWorkspace);

  const handleChange = (value: number) => {
    dispatch(setCurrentWorkspace(value));
  };

  const workspaceData = workspaceList?.map((workspace) => ({ label: workspace.name, value: workspace.id }));

  return (
    <>
      <Select
        placeholder="Выберите рабочее"
        style={{ width: '100%' }}
        defaultValue={currentWorkspace}
        onChange={handleChange}
        options={workspaceData}
      />
    </>
  )
}

export default FranchisorSection;