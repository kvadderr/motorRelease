import { Select } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/storeHooks";
import { selectFranchaisorList } from "../../store/slices/franchisorSlice";
import { setCurrentFranchisor, selectCurrentFranchisor, setCurrentWorkspace } from "../../store/slices/authSlice";


const AdminSection = () => {

  const dispatch = useAppDispatch();
  const franchaisorList = useAppSelector(selectFranchaisorList)
  const currentFranchisor = useAppSelector(selectCurrentFranchisor)
  const franchisorData = franchaisorList?.map((franchisor) => ({ label: franchisor.company, value: franchisor.user_id }));
  const onchange = (value: number) => {
    dispatch(setCurrentFranchisor(value));
    dispatch(setCurrentWorkspace(null))
  }
  return (
    <Select
      placeholder="Выберите франчайзера"
      defaultValue={currentFranchisor}
      style={{ width: '100%' }}
      options={franchisorData}
      onChange={onchange}
    />
  )
}

export default AdminSection;