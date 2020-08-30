export const _areIdenticals = (txts) => {
    const txtref = txts[0];
    return txts.filter(txt => txt !== txtref).length === 0;
};

export const _mailIsValid = mail => {
    return mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  }
