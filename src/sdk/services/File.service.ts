import Service from '../Service'
import { File } from '../@types'

class FileService extends Service {
  static getSignedUrl(fileInfo: File.UploadRequestInput): Promise<string> {
    return this.Http
      .post<File.UploadRequest>('/upload-requests', fileInfo)
      .then(this.getData)
      .then((res: File.UploadRequest): string => res.uploadSignedUrl)
  }

  static uploadFileToSignedUrl(signedUrl: string, file: File): Promise<{}> {
    return this.Http
      .put<{}>(signedUrl, file, {
        headers: { 'Content-Type': file.type }
      })
      .then(this.getData)
  }
}

export default FileService