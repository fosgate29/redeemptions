const ISSUE = {
  ISSUE_1: 1,
  ISSUE_2: 2,
  ISSUE_3: 3,
  ISSUE_4: 4,
  ISSUE_5: 5,
  ISSUE_6: 6,
};

const TYPE = {
  GOLD: 'gold',
  FIRST_EDITION: 'first_edition',
  HOLO: 'holo',
};

/*
	 	token id until 10110, Issue 1. 1-100 is Gold. 101 until 10100 is 1st Edition 10101 until 10110 is Holo
	  token id from 10111 until 20220, Issue 2
	  token id from 20221 until 30330, Issue 3
	  token id from 30331 until 38775, Issue 4		
  	token id from 40441 until 49414, Issue 5+6 - If tokenId is even, it is Issue 6. If it is an odd tokenId, it is Issue 5 
		*/
function getIssueNumber(tokenId) {
  //console.log(tokenId);
  let _issue;
  let _type;

  if (tokenId <= 10110) {
    _issue = ISSUE.ISSUE_1;
    if (tokenId <= 100) {
      _type = TYPE.GOLD;
    } else if (tokenId <= 10100) {
      _type = TYPE.FIRST_EDITION;
    } else {
      _type = TYPE.HOLO; // 10110
    }
  } else if (tokenId <= 20220) {
    _issue = ISSUE.ISSUE_2;
    if (tokenId <= 10210) {
      _type = TYPE.GOLD;
    } else if (tokenId <= 20210) {
      _type = TYPE.FIRST_EDITION;
    } else {
      _type = TYPE.HOLO; // 20220
    }
  } else if (tokenId <= 30330) {
    _issue = ISSUE.ISSUE_3;
    if (tokenId <= 20320) {
      _type = TYPE.GOLD;
    } else if (tokenId < 30320) {
      _type = TYPE.FIRST_EDITION;
    } else {
      _type = TYPE.HOLO; // 30330
    }
  } else if (tokenId <= 38775) {
    _issue = ISSUE.ISSUE_4;
    if (tokenId <= 30430) {
      _type = TYPE.GOLD;
    } else if (tokenId <= 38765) {
      _type = TYPE.FIRST_EDITION;
    } else {
      _type = TYPE.HOLO; // 38775
    }
  } else if (tokenId >= 40441 && tokenId <= 49414) {
    if (tokenId % 2 !== 0) {
      _issue = ISSUE.ISSUE_5;
    } else {
      _issue = ISSUE.ISSUE_6;
    }

    if (tokenId <= 40442) {
      _type = TYPE.HOLO;
    } else if (tokenId <= 40462) {
      _type = TYPE.GOLD;
    } else {
      _type = TYPE.FIRST_EDITION; // 49414
    }
  }

  //console.log({ issue: _issue, type: _type });

  return { issue: _issue, type: _type };
}

module.exports = { getIssueNumber };
