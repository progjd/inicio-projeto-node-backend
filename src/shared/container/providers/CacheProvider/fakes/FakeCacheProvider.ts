import ICacheProvider from '../models/ICacheProvider';

interface ICacheData{
  [key: string]: string;
}
export default class FakeCacheProvider implements ICacheProvider{
  private cahe: ICacheData= {};
 
  public async save(key: string, value: any): Promise<void>{
  this.cahe[key] = JSON.stringify(value);
  };

  public async recover<T>(key: string): Promise<T | null>{
    const data = this.cahe[key];
    if(!data){
      return null;
    }
    const parseData = JSON.parse(data) as T;

    return parseData;
  };

  public async invalidate(key: string ): Promise<void>{
    delete this.cahe[key];
  };

  public async invalidatePrefix(prefix: string ): Promise<void>{
    const keys = Object.keys(this.cahe).filter(key => 
      key.startsWith(`${prefix}:`),
      );
      keys.forEach(key =>{
        delete this.cahe[key];
      });
  }

}
