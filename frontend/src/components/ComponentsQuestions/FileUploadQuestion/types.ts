export enum fileTypes {
    image = 'image',
    video = 'video'
}

export const fileTypesArray = (() => {
   const types = [];
   for (const fileType in fileTypes) {
       types.push(fileType);
   }
   return types;
})();
