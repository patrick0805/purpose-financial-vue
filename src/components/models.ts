

interface IRandomImageResponse {
  message: string;
  status: string
}


interface IMultipleRandomImageResponse {
  message: string[];
  status: string
}
enum LOADING_STATE {
  IDEL = "IDEL",
  LOADING = "LOADING",
  DONE = "DONE",
  ERROR = "ERROR"
}
export { LOADING_STATE }
export type { IRandomImageResponse, IMultipleRandomImageResponse }