export async function queryL2EventRecorderDbUri(
  apiUri: string
): Promise<string> {
  let uri = apiUri + "/l2-event-recorder";
  return await (await fetch(uri)).json();
}
