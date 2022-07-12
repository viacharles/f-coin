import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { EFileType } from '@utility/enum/file.enum';



@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private storage: AngularFireStorage
  ) {

  }

  /**
   * @description 獲得檔案路徑
   * @param path firebase存儲空間路徑
   */
  public getFileURL(path: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.storage.ref(path)
        .getDownloadURL()
        .subscribe(url => resolve(url), error => reject(error));
    });
  }

  /**
   * @description 上傳檔案至firebase存儲空間
   * @param fileType 檔案資料夾
   * @param fileName 檔名
   */
  public upload(fileType: EFileType, fileName: string, file: File) {
    // return new Promise<AngularFireUploadTask>(resolve => {
    //   const Task = this.storage.upload(`${fileType}/${new Date().toISOString()}-${fileName}.${file.name.split('.')[1]}`, file);
    //   resolve(Task);
    // });
  }
}
