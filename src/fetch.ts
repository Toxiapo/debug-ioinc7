export const simpleFetch = async ([url]: [string]) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Something went wrong");
  return response.json();
};
