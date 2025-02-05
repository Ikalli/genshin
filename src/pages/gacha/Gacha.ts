export interface GachaInfo{
  percent: number;
  items: Array<string>;
  pickUpPercent: number;
  pickUpItems: Array<string>;
}

export interface GachaData{
  pickUpTarget: Array<string>;
  maxPityCount: number;
  maxPickUpCount: number;
  maxBonusCount: number;
  guaranteeItem: string;
  fiveStars: GachaInfo;
  fourStars: GachaInfo;
  threeStars: GachaInfo;
}

export class GachaContent implements GachaData{
  readonly pickUpTarget: Array<string>;
  readonly maxPityCount: number;
  readonly maxPickUpCount: number;
  readonly maxBonusCount: number;
  readonly guaranteeItem: string;
  readonly fiveStars: GachaInfo;
  readonly fourStars: GachaInfo;
  readonly threeStars: GachaInfo;

  constructor(data: GachaData){
    this.pickUpTarget = data.pickUpTarget;
    this.maxPityCount = data.maxPityCount;
    this.maxPickUpCount = data.maxPickUpCount;
    this.maxBonusCount = data.maxBonusCount;
    this.guaranteeItem = data.guaranteeItem;
    this.fiveStars = data.fiveStars;
    this.fourStars = data.fourStars;
    this.threeStars = data.threeStars;

    this.isValidData();
  }

  isValidData(){
    /// NORMAL_ITEMS에 WIN_ITEMS가 절대 포함되면 안 됨 이라는 코드 작성 필요
  }
}

export class GachaController {
  private data: GachaContent;
  public totalCount: number;
  public pityCount: number;
  public favoriteCount: number;
  public nextPity: number;
  public gachaResult: Array<string>;
  public isGuaranteeItem: boolean;
  public isNextFivePickUp: boolean;
  public isNextFourPickUp: boolean;

  constructor(gachaData: GachaContent){
    this.data = gachaData;
    this.totalCount = 0;
    this.pityCount = 0;
    this.favoriteCount = 0;
    this.nextPity = gachaData.maxPityCount;
    this.gachaResult = new Array<string>();
    this.isGuaranteeItem = false;
    this.isNextFivePickUp = false;
    this.isNextFourPickUp = false;
  }

  clear(){
    this.totalCount = 0;
    this.pityCount = 0;
    this.favoriteCount = 0;
    this.gachaResult = new Array<string>();
    this.isGuaranteeItem = false;
    this.isNextFivePickUp = false;
  }

  pick(info: GachaInfo): string {
    const isPickUp = Math.random() * 100 <= info.pickUpPercent;
    let resultItem: string;

    // Check Pick Up
    if(isPickUp){
      const itemIndex = Math.floor(Math.random() * info.pickUpItems.length);
      resultItem = info.pickUpItems[itemIndex];
    }
    // Not Pick Up
    else{
      const nonPickUpItems: Array<string> = info.items.filter(
        (item: string) => !info.pickUpItems.includes(item)
      );
      const itemIndex:number = Math.floor(Math.random() * nonPickUpItems.length);
      resultItem = nonPickUpItems[itemIndex];
    }

    return resultItem;
  }

  nextIsPickUp(info: GachaInfo, isNextPickUp: boolean): string {
    let resultItem: string;

    if(info.pickUpItems.length > 0) {
      
      if(isNextPickUp) {
        const characterIndex = Math.floor(Math.random() * info.pickUpItems.length)
        resultItem = info.pickUpItems[characterIndex];
        isNextPickUp = false;
        
      }
      else {
        resultItem = this.pick(info);
        isNextPickUp = true;
        
      }
    }
    else {
      resultItem = this.pick(info);
    }

    return resultItem;
  }

  start(tries: number): Array<string> {
    this.totalCount += tries;
    const resultItems = new Array<string>();

    for(let i = 0; i<tries; i++){
      this.pityCount += 1;
      this.favoriteCount += 1;

      // 4성이상 보장, 초보자 Noelle
      if(this.data.maxBonusCount === tries && i === 0) {
        const percent = Math.random() * 100;
        let resultItem: string;

        if(this.data.guaranteeItem && !this.isGuaranteeItem) {
          resultItem = this.data.guaranteeItem;
          this.isGuaranteeItem = true;
        }
        else if(percent <= this.data.fiveStars.percent) {
          resultItem = this.pick(this.data.fiveStars);
          this.pityCount = 0;
          
          if (this.data.fiveStars.pickUpItems.includes(resultItem)) {
            this.favoriteCount = 0;
            this.isNextFivePickUp = false;
          }
          else {
            this.isNextFivePickUp = true;
          }
        }
        else {
          resultItem = this.nextIsPickUp(this.data.fourStars, this.isNextFourPickUp);

          if (this.data.fourStars.pickUpItems.includes(resultItem)) {
            this.isNextFourPickUp = false;
          } 
          else {
            this.isNextFourPickUp = true;
          }
        }

        resultItems.push(resultItem);
      }
      // maxPickUpCount 천장
      else if(this.favoriteCount === this.data.maxPickUpCount) {
        let resultItem: string;

        if(this.data.fiveStars.pickUpItems.length > 0) {
          const characterIndex = Math.floor(Math.random() * this.data.pickUpTarget.length)
          resultItem = this.data.pickUpTarget[characterIndex];

        }
        else {
          resultItem = this.pick(this.data.fiveStars);

        }

        this.pityCount = 0;
        this.favoriteCount = 0;
        this.isNextFivePickUp = false;
        
        resultItems.push(resultItem);
      }
      // maxPityCount 천장
      else if(this.pityCount === this.data.maxPityCount){
        
        const resultItem = this.nextIsPickUp(this.data.fiveStars, this.isNextFivePickUp);

        this.pityCount = 0;
        
        if(this.data.pickUpTarget.includes(resultItem)){
          this.favoriteCount = 0;
          this.isNextFivePickUp = false;
          
        }
        else{
          this.isNextFivePickUp = true;
          
        }

        resultItems.push(resultItem);
      }
      // 일반 뽑기
      else{
        const percent = Math.random() * 100;
        let resultItem: string;

        if(percent <= this.data.fiveStars.percent) {

          resultItem = this.nextIsPickUp(this.data.fiveStars, this.isNextFivePickUp);
          
          this.pityCount = 0;
          
          if (this.data.fiveStars.pickUpItems.includes(resultItem)) {
            this.favoriteCount = 0;
            this.isNextFivePickUp = false;
            
          }
          else {
            this.isNextFivePickUp = true;
          }

        }
        else if(percent <= (this.data.fiveStars.percent + this.data.fourStars.percent)) {
          
          resultItem = this.nextIsPickUp(this.data.fourStars, this.isNextFourPickUp);
          
          if (this.data.fourStars.pickUpItems.includes(resultItem)) {
            this.isNextFourPickUp = false;
            
          }
          else {
            this.isNextFourPickUp = true;
          }

        }
        else {
          resultItem = this.pick(this.data.threeStars);
        }

        resultItems.push(resultItem);
      }
    }
    
    this.nextPity = this.data.maxPityCount - this.pityCount;
    this.gachaResult = resultItems;
    return resultItems;
  }
}