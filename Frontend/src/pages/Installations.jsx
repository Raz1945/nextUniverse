import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InstallationSupplies } from '../components/Supplies/InstallationSupplies';
import { fetchInstallationLevels } from '../redux/reducers/installationSlice';
import { useInstallationLogic } from '../hooks/useInstallationLogic';

export const Installations = () => {
  const dispatch = useDispatch();
  const installationState = useSelector((state) => state.installation);
  console.log('Estado actual de instalación:', installationState);

  useEffect(() => {
    dispatch(fetchInstallationLevels());
  }, [dispatch]);

  const {
    handleOnClickUpdate,
    handleOnClickCancel,
    handleOnClickDestroy,
  } = useInstallationLogic(installationState, dispatch);

  return (
    <InstallationSupplies
      installationState={installationState}
      onClickUpdate={handleOnClickUpdate}
      onClickCancel={handleOnClickCancel}
      onClickDestroy={handleOnClickDestroy}
    />
  );
};
