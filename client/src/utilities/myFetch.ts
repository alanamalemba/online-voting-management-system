export async function myFetch(url: string) {
  try {
    const response = await fetch(`${url}`);

    const resData = await response.json();

    if (resData.error) {
      throw new Error(resData.error);
    }

    return resData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}

myFetch.post = async function (url: string, data: object) {
  try {
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error);
    }

    return resData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
