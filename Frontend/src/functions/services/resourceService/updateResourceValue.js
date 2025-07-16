import axios from '../../../api/axios';

const UPDATE_RESOURCE_ENDPOINT = '/profile/update';

export const updateResourceValue = async (updateResource) => {
  // console.log('updateResourceValue: ', updateResource);
  // console.log('updateResourceValue: ', updateResource.metalProduction);

  const { metalProduction, crystalProduction, deuteriumProduction } =
    updateResource; 

  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('Access token not available.');
    }

    await axios.post(
      UPDATE_RESOURCE_ENDPOINT,
      {
        metalProduction,
        crystalProduction,
        deuteriumProduction,
        // ...
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log('Resource values updated successfully.');
  } catch (error) {
    console.error('Error updating resource values:', error.message);
    throw new Error('updateResourceValue: Failed to update resource values.');
  }
};
