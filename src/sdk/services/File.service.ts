import { v4 as uuidv4 } from 'uuid'
import { File } from '../@types'
import Service from '../Service'

class FileService extends Service {
  private static getSignedUrl(fileInfo: File.UploadRequestInput): Promise<string> {
    return this.Http
      .post<File.UploadRequest>('/upload-requests', fileInfo)
      .then(this.getData)
      .then((res: File.UploadRequest): string => res.uploadSignedUrl)
  }

  private static uploadFileToSignedUrl(signedUrl: string, file: File): Promise<{}> {
    return this.Http
      .put<{}>(signedUrl, file, {
        headers: { 'Content-Type': file.type }
      })
      .then(this.getData)
  }

  private static getFileExtension(fileName: string): string {
    const [extension] = fileName.split('.').slice(-1)
    return extension
  }

  private static generateFileName(extension: string): string {
    return `${uuidv4()}.${extension}`
  }

  static async upload(file: File) {
    const extension: string = this.getFileExtension(file.name)
    const fileName: string = this.generateFileName(extension)

    const signedUrl: string = await FileService
      .getSignedUrl({ fileName, contentLength: file.size })

    await FileService
      .uploadFileToSignedUrl(signedUrl, file)

    return signedUrl.split('?')[0]
  }
}

export default FileService