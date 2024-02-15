
// export const eventDataService = [
//     async getEventData({ compId }) {
//       let url = `calendar`;
//       const { data } = await apiClient.get(url);
//       return data;
//     }
//   ];


export const submitBooking = (bookingData) => {
  return fetch('https://your-api-endpoint.com/booking', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error: ' + response.statusText);
    }
  });
};
