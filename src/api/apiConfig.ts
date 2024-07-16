export function createAxiosConfig() {
    const accessToken = sessionStorage.getItem('accessToken');
    let config = {};
    if (accessToken) {
      config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }
    return config;
  }