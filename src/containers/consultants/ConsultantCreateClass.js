/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import Stepper from 'bs-stepper';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
// import { EditorState, ContentState } from 'draft-js';

import { ConsultantCreateComponent } from '../../components/consultants';
import { GetB2BInvitationView } from '../../actions/invitations/InvitationActions';
import { PostB2BCnsltantWorkInfo, PostB2BCnsltantEduInfo, PostB2BCnsltantExpInfo, DeleteB2BCnsltantEduInfo, DeleteB2BCnsltantExpInfo, PostB2BCnsltantCrtfcInfo, DeleteB2BCnsltantCrtfcInfo } from '../../actions/consultants/ConsultantActions';
import { putB2BInvitationsStatusUpdate } from '../../actions/invitations/InvitationActions';
import { PostB2BDropdownsCreateAPI, PostB2BDropdownsListAPI } from '../../actions/dropdowns/DropdownsActions';
import { addTenYears, allCapsAlpha, firstCharCaps, getTomorrowDate, getYesterdayDate, initCaps } from '../../hooks/common';
import localForage from '../../hooks/localForage';
import config from '../../../config/apis.json';
import States from '../../../public/data/CountryStates.json';
import Countries from '../../../public/data/Countries.json';
import { setHeadersToken } from '../../hooks/apihooks';
// import comData from '../../../public/data/Lookups.json';

const countryObj = { label: "United States", value: "United States of America", code: "USA", sCode: "US", mobCC: "+1" };
const stateObj = { stateName: '', stateCode: '', label: "Select", value: '' }

class ConsultantCreateClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      errors: {},
      eduErrors: [],
      expErrors: [],
      crtfcErrors: [],
      thirdErrorIndex: null,
      fourthErrorIndex: null,
      isShowEmpDetails: false,
      adUserData: {
        fName: '',
        lName: '',
        email: '',
        altEmail: '',
        dob: '',
        mobCc: '+1',
        mobNum: '',
        altMobCc: '+1',
        altMobNum: '',
        emrMobCc: '+1',
        emrMobNum: '',
        emrPerson: '',
        emrRel: '',
        emrEmail: '',
        linkdInUrl: [],
        ssnNum: '',
        ssnExpDate: '',
        isCheck: false,
        file: '',
        imgUrl: '',
        imgid: '',
        iconPath: '',
        iPath: '',
        gender: 'Male',
        mrgStatus: '',
        referedBy: '',
        // ==========usa
        aCountryCode: 'USA',
        aStatesArr: [],
        aStateCode: '',
        aAddress: '',
        aArea: '',
        aCity: '',
        aZip: '',
        usaId: '',
        // ============
        nationalId: '',
        dlNum: '',
        stateIdNum: '',
        otherNationalId: '',
        idNum: '',
        adrsCheck: true,
        nationalIdIsdDate: '',
        nationalIdExpDate: '',
        // =============
        cCode: 'USA',
        statesArr: [],
        stCode: '',
        adrs: '',
        area: '',
        city: '',
        pincode: '',
        userData: {},
        nAdrsId: '',
      },
      workData: {
        uscisCheck: false,
        cardExpDate: '',
        workAuthId: '',
        nationality: '',
        visaStatus: '',
        visaStartDate: '',
        visaExpDate: '',
        sevisNum: '',
        position: '',
        receiptNum: '',
        cardRecieptNum: '',
        cardNum: '',
        cardCheck: false,
        USCISNum: '',
        i94Num: '',
        i94ExpDate: '',
        passportNum: '',
        passportIsdDate: '',
        passportExpDate: '',
        passportIsdPlace: '',
        passDocNum: '',
        recieptNum: '',
        workAuthStartDate: '',
        workAuthExpDate: '',
        isWorkCheck: false,
        workAuthData: {},
      },
      eduData: [{ degree: '', specialization: '', institution: '', passoutYear: '', isDropdown: true, id: '' }],
      edctnData: [{ degree: '', specialization: '', institution: '', passoutYear: '', isDropdown: true, id: '' }],
      crtfcData: [{cName: '', cSpec: '', cBy: '', cDt: '', isDropdown: true, id: ''}],
      crtfcnsData: [{cName: '', cSpec: '', cBy: '', cDt: '', isDropdown: true, id: ''}],
      expData: {
        expResData: {},
        expYrs: { label: 0, value: 0 },
        expMonths: { label: 0, value: 0 },
        jobTitle: null,
        skills: [],
        skillOptions: [],
        // summary: EditorState.createEmpty(),
        summary: '',
        insurence: 'false',
      },
      empDetails: [{
        id: 1,
        presentEmployer: false,
        empType: '',
        company: '',
        endClient: '',
        expCcode: countryObj,
        expStateArr: [],
        expStCode: stateObj,
        expLoc: '',
        designation: '',
        rolesRes: '',
        expStartDate: '',
        expEndDate: '',
        pSkills: [],
        // description: EditorState.createEmpty()
        description: ''
      }],
      errMsg: '',
      totalConsultData: {},
      viewData: {},
      rolesObj: {},
      editBtn: false,
      submitBtn: false,
      sucMsg: false,
      isChecked: false,
      cmnModal: false, cmnValue: '', cmnErrMsg: '', cmnType:'', cmnSkillArr:[], cmnJbTitleArr:[],
      showSsn: false,
      userData: {}
    };
    this.stepperRef = React.createRef();
    this.fileInput = React.createRef();
  };

  componentDidMount = async () => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    this.setState({userData: userInfo});
    this.stepperInstance = new Stepper(this.stepperRef.current, {
      linear: true,
      animation: true
    });
    this.setCountryData();
    this.getInvtnData(this.props.id);
    this.getSkillsList();
  }
  setStateData = (data) => this.setState({...data});
  setCountryData = () => {
    const { empDetails, adUserData } = this.state;
    empDetails.forEach((item, i) => {
      const countryCode = item.expCcode?.code;
      if (countryCode && States[countryCode]) {
        const states = States[countryCode];
        this.setState(prevState => ({ empDetails: prevState.empDetails.map((detail, index) => index === i ? { ...detail, expStateArr: states } : detail) }));
      }
    });
    const aStatesArr = States[adUserData.aCountryCode];
    const statesArr = States[adUserData.cCode];
    this.setState(prevState => ({ adUserData: { ...prevState.adUserData, aStatesArr, statesArr } }));
  }
  getInvtnData = async (id) => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    this.props.GetB2BInvitationView(id, (resObj) => {
      if (resObj.status === '200') {
        const resData = resObj.resData.result;
        const expResData = resData.wrkExps && resData.wrkExps.length > 0 ? resData.wrkExps[0] : {};
        const file = resData.piPath ? new File([], resData.piPath) : null;
        const dt = resData.piPath ? resData.piPath.split('/') : '';
        const imgid = resData.piPath ? dt.length > 2 ? dt[dt.length - 2] : '' : '';
        const userData = this.setUserData(resData);
        const adrsData = resData?.address && resData?.address?.length > 0 ? this.setAdrsData(resData.address) : [];
        const workAuthData = resData.workAuths && resData.workAuths.length > 0 ? this.setWorkAuthData(resData.workAuths[0]) : {};
        const eduData = resData.education && resData.education.length > 0 ? this.setEduData(resData.education) : this.state.eduData;
        const crtfcData = resData.certs && resData.certs.length > 0 ? this.setCrtfcData(resData.certs) : this.state.crtfcData;
        const expData = expResData._id ? this.setExpData(expResData) : this.state.expData;
        const empDetails = expResData.emps && expResData.emps.length > 0 ? this.setEmpDetails(expResData.emps) : this.state.empDetails;
        this.setState(prevState => ({
          adUserData: { ...prevState.adUserData, ...resData, userData: resData, ...userData, ...adrsData, file, iconPath: resData.piPath ? resData.piPath : '', iPath: resData.piPath ? resData.piPath : '', imgid }, errors: {},
          workData: { ...prevState.workData, workAuthData: resData.workAuths[0], ...workAuthData },
          eduData: eduData, edctnData: resData.education, crtfcData: crtfcData, crtfcnsData: resData.certs,
          expData: { ...prevState.expData, ...expData, expResData }, isShowEmpDetails: (Number(expResData.expYears) || Number(expResData.expMonths)) >= 1 ? true : false,
          empDetails: empDetails, totalConsultData: resData,
          viewData: resData, rolesObj: { ...rolesObj, appAcc },
          isChecked: resData.certs && resData.certs.length ? true : false,
        }));
      }
    });
  }
  getSkillsList = () => {
      const reqBody = { actPgNum: 1, rLimit: 100 }
      this.props.PostB2BDropdownsListAPI(reqBody, (resObj) => {
        if (resObj.status == '200') {
          const resData = resObj.resData.result.lookUpsList;
          const data = resData.map(item => ({ ...item, label: item.name, value: item.name }));
          const cmnSkillArr = data?.length > 0 ? data.filter(item => item.type === 'Skill') : [];
          const cmnJbTitleArr = data?.length > 0 ? data.filter(item => item.type === 'Job Title') : [];
          this.setState({ cmnSkillArr, cmnJbTitleArr });
        } else {
          this.setState({ cmnSkillArr: [], cmnJbTitleArr:[] });
        }
      })
    }
  setUserData = (resData) => {
    const emrMobCcNum = resData.ecNum ? resData.ecNum.split(' ') : [];
    return {
      fName: resData.fName == 'Consultant' ? '' : resData.fName,
      lName: resData.lName == 'Consultant' ? '' : resData.lName,
      email: resData.emID || '',
      altEmail: resData.altEmID || '',
      dob: resData.dobStr || '',
      isCheck: resData.ssnExpDtStr ? true : false,
      emrMobCc: emrMobCcNum[0] ? emrMobCcNum[0] : '+1',
      emrMobNum: emrMobCcNum[1] ? emrMobCcNum[1] : '',
      emrPerson: resData.ecPer || '',
      emrRel: resData.ecRelt || '',
      emrEmail: resData.ecEml || '',
      linkdInUrl: resData.wrkUrls[0] || '',
      mrgStatus: resData.mStatus || '',
      ssnNum: resData.ssn || '',
      ssnExpDate: resData.ssnExpDtStr || '',
      stateIdNum: resData.usaNatID || '',
      nationalIdIsdDate: resData.unidIssDt || '',
      nationalIdExpDate: resData.unidExpDt || '',
      nationalId: (resData.unidType == 'DL' || resData.unidType == 'State ID') ? resData.unidType : (!resData.unidType ? '' : 'Other'),
      dlNum: resData.unidType == 'DL' ? resData.usaNatID : '',
      stateIdNum: resData.unidType == 'State ID' ? resData.usaNatID : '',
      idNum: (resData.unidType == 'DL' || resData.unidType == 'State ID') ? '' : !resData.usaNatID ? '' : resData.usaNatID,
      otherNationalId: (resData.unidType == 'DL' || resData.unidType == 'State ID') ? '' : !resData.unidType ? '' : resData.unidType,
    }
  }
  setAdrsData = (resData) => {
    const usaAdrs = resData && resData?.length > 0 ? resData.find(item => item.adrsType == 'USA RES') : {};
    const nAdrs = resData && resData?.length > 0 ? resData.find(item => item.adrsType == 'USA ID') : {};
    const aStatesArr = usaAdrs?.cCode ? States[usaAdrs.cCode] : [];
    const statesArr = nAdrs?.cCode ? States[nAdrs.cCode] : States['USA'];
    return {
      usaId: usaAdrs?._id,
      aCountryCode: usaAdrs?.cCode || 'USA',
      aStatesArr,
      aStateCode: usaAdrs?.sCode,
      aAddress: usaAdrs?.hNum,
      aArea: usaAdrs?.area,
      aCity: usaAdrs?.city,
      aZip: usaAdrs?.zip,
      // =================
      nAdrsId: nAdrs?._id,
      cCode: nAdrs?.cCode || 'USA',
      statesArr,
      stCode: nAdrs?.sCode,
      adrs: nAdrs?.hNum,
      area: nAdrs?.area,
      city: nAdrs?.city,
      pincode: nAdrs?.zip,
      adrsCheck: nAdrs?._id ? false : true
    }
  }
  setWorkAuthData = (resData) => {
    return {
      nationality: resData.nationality,
      visaStatus: resData.visaStatus,
      visaStartDate: resData.visaStDtStr,
      visaExpDate: resData.visaExpDtStr,
      sevisNum: resData.sevisNum,
      position: resData.position,
      receiptNum: resData.receiptNum,
      cardNum: resData.cardNum,
      cardCheck: resData.cardRcptNum ? true : false,
      cardRecieptNum: resData.cardRcptNum,
      USCISNum: resData.uscisNum,
      i94Num: resData.li94Num,
      i94ExpDate: resData.i94ExpDtStr,
      passportNum: resData.psprtNum,
      passportIsdDate: resData.psprtIssDtStr,
      passportExpDate: resData.psprtExpDtStr,
      passportIsdPlace: resData.psprtIssPlace,
      passDocNum: resData.psprtDocNum,
      cardExpDate: resData.cardExpDtStr,
      workAuthStartDate: resData.wrkAuthStrtDtStr,
      workAuthExpDate: resData.wrkAuthExpDtStr
    }
  }
  setEduData = (resData) => {
    let eduData = [];
    resData && resData.length > 0 && resData.forEach((item, i) => {
      const date = moment(`${item.dYear}-${item.dMonth}-01`, "YYYY-MM-DD");
      if (date.isValid()) {
        let object = { degree: item.degree, specialization: item.dSpcl, institution: item.noi, passoutYear: date.toDate(), isDropdown: true, id: item._id }; // Convert to native Date for DatePicker
        eduData[i] = object;
      }
      // else {
      //   eduData[i] = { passoutYear: null };
      // }
    });
    return eduData;
  };
  // set certificates data
  setCrtfcData = (resData) => {
    let crtfcData = [];
    resData &&
      resData.length > 0 &&
      resData.forEach((item, i) => {
        const data = item.cDt ? item.cDt.split(' ') : [];
        const date = item.cDt && data.length ? new Date(data[1], data[0] - 1, 2) : '';
        let object = {cName: item.cName, cSpec: item.cSpec, cBy: item.cBy, cDt: date ? date : '', isDropdown: true, id: item._id};
        crtfcData[i] = object;
      });
    return crtfcData;
  };
  setExpData = (resData) => {
    const yData = { label: Number(resData.expYears), value: Number(resData.expYears) };
    const mData = { label: Number(resData.expMonths), value: Number(resData.expMonths) };
    let skills = resData.primSkillsArr && resData.primSkillsArr.length > 0 && resData.primSkillsArr.map(item => {
      return {
        label: item, value: item
      }
    });
    const jobTitle = { label: resData.jobTitle, value: resData.jobTitle }
    // const contentState = ContentState.createFromText(resData.prfsSrm);
    // const summary = EditorState.createWithContent(contentState);
    return {
      expYrs: yData,
      expMonths: mData,
      jobTitle,
      skills,
      summary: resData.prfsSrm,
      insurence: resData.healthIns ? 'true' : 'false'
    }
  }
  setEmpDetails = (resData) => {
    let empDetails = [];
    resData && resData.length > 0 && resData.forEach((item, i, arr) => {
      let pSkills = item.skillsArr && item.skillsArr.length > 0 && item.skillsArr.map(skill => {
        return {
          label: skill, value: skill
        }
      });
      const expCcode = item.cCode ? Countries.find(c => c.code == item.cCode) : countryObj;
      const expStateArr = item.cCode ? States[item.cCode] : [];
      const expStCode = expStateArr && expStateArr.length > 0 ? expStateArr.find(s => s.value == item.sCode) : stateObj;
      // const contentState = ContentState.createFromText(item.desc);
      // const description = EditorState.createWithContent(contentState);
      let object = { id: item._id, presentEmployer: item.present ? true : false, empType: item.empType, company: item.company, endClient: item.endClient, expCcode, expStateArr, expStCode, expLoc: item.city, designation: item.designation, expStartDate: item.fDtStr, expEndDate: item.tDtStr ? item.tDtStr : '', rolesRes: item.rolesRes, pSkills, description: item.desc }
      empDetails[i] = object
    })
    return empDetails;
  }
  getStepData = () => {
    const { currentStep } = this.state;
    if (currentStep === 1) return 'adUserData';
    if (currentStep === 2) return 'workData';
    if (currentStep === 4) return 'expData';
  };
  handleOnchange = (event) => {
    const { name, type, value, files, checked } = event.target;
    const newValue = (name === 'summary') ? firstCharCaps(value) : ((name === 'fName' || name === 'lName' || name === 'emrPerson' || name === 'emrRel' || name == 'aCity' || name == 'city' || name == 'aAddress' || name == 'aArea' || name == 'adrs' || name == 'area' || name === 'passportIsdPlace') ? initCaps(value) : (name === 'altEmail' ? (value).toLowerCase().trim() : value));
    const stepperData = this.getStepData();
    if (type === 'file') {
      if (files[0]) {
        const imgUrl = URL.createObjectURL(files[0]);
        const { name } = event.target;
        this.setState(prevState => ({ [stepperData]: { ...prevState[stepperData], [name]: files[0], imgUrl, iconPath: '' }, errors: {} }));
      }
    } else if (type === 'checkbox') {
      this.setState(prevState => ({
        [stepperData]: {
          ...prevState[stepperData], [name]: checked,
          ...(name === 'cardCheck' ? { cardNum: checked ? '' : prevState[stepperData].cardNum, USCISNum: checked ? '' : prevState[stepperData].USCISNum, workAuthStartDate:  checked ? '' : prevState[stepperData].workAuthStartDate, workAuthExpDate:  checked ? '' : prevState[stepperData].workAuthExpDate, cardRecieptNum: checked ? prevState[stepperData].cardRecieptNum : '' } : name === 'isCheck' ? { ssnNum: checked ? '' : prevState[stepperData].ssnNum, ssnExpDate: checked ? prevState[stepperData].ssnExpDate : '' } : '')
        }, errors: {}
      }));
    } else if (name == 'aCountryCode') {
      const aStatesArr = value ? States[value] : [];
      this.setState(prevState => ({ [stepperData]: { ...prevState[stepperData], [name]: newValue, aStatesArr, aStateCode: '' }, errors: {} }));

    } else if (name == 'cCode') {
      const statesArr = value ? States[value] : [];
      this.setState(prevState => ({ [stepperData]: { ...prevState[stepperData], [name]: newValue, statesArr, stCode: '' }, errors: {} }));

    } else if (value == 'American') {
      this.setState(prevState => ({ [stepperData]: { ...prevState[stepperData], [name]: newValue, visaStatus: '', visaStartDate: '', sevisNum: '', position: '', receiptNum: '', visaExpDate: '', USCISNum: '', i94Num: '', i94ExpDate: '', workAuthStartDate: '', workAuthExpDate: '', cardRecieptNum: '', cardNum: '', cardCheck: false }, errors: {} }));
    } else if (name == 'visaStatus') {
      this.setState(prevState => ({ [stepperData]: { ...prevState[stepperData], [name]: newValue, visaStartDate: '', sevisNum: '', position: '', receiptNum: '', visaExpDate: '', USCISNum: '', i94Num: '', i94ExpDate: '', workAuthStartDate: '', workAuthExpDate: '', cardRecieptNum: '', cardNum: '', cardCheck: false }, errors: {} }));
    } else {
      this.setState(prevState => ({ [stepperData]: { ...prevState[stepperData], [name]: newValue, ...(name === 'passportIsdDate' && { passportExpDate: addTenYears(value) }) }, errors: {} }));
    }
  }
  handleExpchange = (type, data, index) => {
    const expStateArr = data.code ? States[data.code] : [];
    this.setState(prevState => ({
      empDetails: prevState.empDetails.map((item, i) =>
        i === index ? { ...item, [type]: data, ...(type === 'expCcode' && { expStateArr: expStateArr, expStCode: stateObj }) } : item), expErrors: []
    }));
  };
  handleYearChange = (type, data, index) => {
    this.setState({ isShowEmpDetails: data?.value !== 0 });
    if (type == 'pSkills') {
      this.setState(prevState => {
        const updatedEmpDetails = [...prevState.empDetails];
        updatedEmpDetails[index] = { ...updatedEmpDetails[index], [type]: data, };
        return { empDetails: updatedEmpDetails };
      });
    } else {
      this.setState(prevState => {
        // if (data?.__isNew__) {
        //   comData.jobTitleList.push({ label: initCaps(data.label), value: initCaps(data.value) });
        // }
        const updatedExpData = { ...prevState.expData, [type]: data?.__isNew__ ? { label: initCaps(data.label), value: initCaps(data.value) } : data, };
        const years = updatedExpData.expYrs?.value || 0;
        const months = updatedExpData.expMonths?.value || 0;
        const isShowEmpDetails = !(years === 0 && months === 0);
        return {
          expData: updatedExpData,
          isShowEmpDetails,
          errors: {}
        }
      });
    }
  }
  // editorChange = (type, data, index) => {
  //   if (type === 'summary') {
  //     this.setState(prevState => ({ expData: { ...prevState.expData, [type]: data } }));
  //   } else if (type === 'description') {
  //     this.setState(prevState => {
  //       const updatedEmpDetails = [...prevState.empDetails];
  //       updatedEmpDetails[index] = { ...updatedEmpDetails[index], description: data, };
  //       return { empDetails: updatedEmpDetails };
  //     });
  //   }
  // };
  // handleCreateSkill = (inputValue, index = null) => {
  //   const newOption = { label: inputValue, value: inputValue };
  //   if (index !== null) {
  //     this.setState(prevState => {
  //       const updatedEmpDetails = [...prevState.empDetails];
  //       updatedEmpDetails[index] = { ...updatedEmpDetails[index], pSkills: [...updatedEmpDetails[index].pSkills, newOption] };
  //       return { empDetails: updatedEmpDetails, errors: {} };
  //     });
  //   } else {
  //     this.setState(prevState => ({ expData: { ...prevState.expData, skills: [...prevState.expData.skills, newOption] }, errors: {} }));
  //   }
  // };
  handleFieldChange = (index, field, event, dataType) => {
    const data = [...this.state[dataType]];
    if (dataType === 'empDetails') {
      if (dataType === 'empDetails' && field === 'presentEmployer') {
        data[index].presentEmployer = !data[index].presentEmployer;
        if (data[index].presentEmployer) {
          data[index].expEndDate = '';
          data.forEach((item, i) => {
            if (i !== index) item.presentEmployer = false;
          });
        }
      } else {
        field == 'passoutYear' ? data[index][field] = event
          : (field === 'expLoc' || field === 'institution' || field === 'company' || field === 'endClient' || field === 'designation') ? data[index][field] = initCaps(event.target.value)
            : (field === 'rolesRes' || field === 'description') ? data[index][field] = firstCharCaps(event.target.value)
              : field === 'specialization' ? data[index][field] = allCapsAlpha(event.target.value)
                : data[index][field] = event.target.value;
      }
    } else if (dataType === 'eduData') {
      field == 'passoutYear' ? (data[index][field] = event) : (data[index][field] = event.target.value);
    } else {
      field == 'cDt' ? (data[index][field] = event) : (data[index][field] = event.target.value);
    }
    const errors = dataType === 'eduData' ? 'eduErrors' : dataType === 'crtfcData' ? 'crtfcErrors' : 'expErrors';
    this.setState({ [dataType]: data, [errors]: [] });
  }
  handleAddField = (type) => {
    if (type == 'eduData' && this.validateThirdStep()) {
      this.setState(prevState => ({ eduData: [...prevState.eduData, { degree: '', specialization: '', institution: '', passoutYear: '', isDropdown: true, id: '' }] }));
    } else if (type == 'crtfcData' && this.validateCertStep()) {
      this.setState((prevState) => ({crtfcData: [...prevState.crtfcData, {cName: '', cSpec: '', cBy: '', cDt: '', isDropdown: true, id: ''}]}));
    } else if (type == 'empDetails') {
      // const { empDetails } = this.state;
      // let states = []
      // empDetails.forEach(item => {
      //   const countryCode = item.expCcode?.code;
      //   if (countryCode && States[countryCode]) {
      //     states = States[countryCode];
      //   }
      // });
      let states = States[countryObj.code];      
      this.setState(prevState => ({ empDetails: [...prevState.empDetails, { id: this.state.empDetails.length + 1, presentEmployer: false, empType: '', company: '', expCcode: countryObj, expStateArr: states, expStCode: stateObj, expLoc: '', designation: '', rolesRes: '', expStartDate: '', expEndDate: '', pSkills: [], description: ''/*EditorState.createEmpty()*/ }] }));
    }
  };
  handleDeleteField = (index, id, type) => {
    const key = type === 'eduData' ? 'eduData' : type === 'crtfcData' ? 'crtfcData' : 'empDetails';
    const deleteFunc = type === 'eduData' ? this.props.DeleteB2BCnsltantEduInfo : type === 'crtfcData' ? this.props.DeleteB2BCnsltantCrtfcInfo : this.props.DeleteB2BCnsltantExpInfo;
    if (this.state[key].length) {
      this.setState(prevState => ({ [key]: index == 0 && type === 'crtfcData' ? [{cName: '', cSpec: '', cBy: '', cDt: '', isDropdown: true, id: ''}] : prevState[key].filter((_, i) => i !== index), ['isChecked']: key == 'crtfcData' && index == 0 ? false : this.state.isChecked, }));
    }
    deleteFunc(id, (resObj) => { });
  };
  validateFirstStep = () => {
    const { currentStep, adUserData } = this.state;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,5}$/;
    const phRegex = /^\d{10}$/;
    let errors = {};
    const minDate = moment().subtract(18, 'years').format('YYYY-MM-DD');
    const tomorrow = getTomorrowDate();
    const yesterday = getYesterdayDate();
    const linkedinValid = /^(https?:\/\/)/;
    if (currentStep === 1) {
      if (!adUserData.fName) {
        errors.fName = 'First Name is required';
      } else if (!adUserData.lName) {
        errors.lName = 'Last Name is required';
      } else if (!adUserData.email) {
        errors.email = 'Email is required';
      } else if (adUserData.email && !emailValid.test(adUserData.email)) {
        errors.email = 'Invalid Email';
      } else if (!adUserData.mobNum) {
        errors.mobNum = 'Mobile Number is required';
      } else if (adUserData.mobNum && !phRegex.test(adUserData.mobNum)) {
        errors.mobNum = 'Invalid Mobile Number';
      } else if (!adUserData.dob) {
        errors.dob = 'Date of Birth is required';
      } else if (adUserData.dob > minDate) {
        errors.dob = 'You must be at least 18 years old. Please check your date of birth.';
      } else if (!adUserData.gender) {
        errors.gender = 'Gender is required';
      } else if (adUserData.altMobNum && !phRegex.test(adUserData.altMobNum)) {
        errors.altMobNum = 'Invalid Alternate Mobile Number';
      } else if (!adUserData.isCheck && !adUserData.ssnNum) {
        errors.ssnNum = 'SSN Number is required';
      } else if (adUserData.isCheck && !adUserData.ssnExpDate) {
        errors.ssnExpDate = 'SSN Expected Date is required';
      } else if (adUserData.isCheck && adUserData.ssnExpDate < tomorrow) {
        errors.ssnExpDate = 'Please provide the valid expiry date';
      // } else if (!adUserData.linkdInUrl) {
      //   errors.linkdInUrl = 'LinkedIn URL is required';
      // } else if (adUserData.linkdInUrl && !linkedinValid.test(adUserData.linkdInUrl)) {
      //   errors.linkdInUrl = 'Starting "http:// or https://" is required';
      // } else if(adUserData.linkdInUrl && (adUserData.linkdInUrl.split('/').length < 3 || adUserData.linkdInUrl.split('/')[2].length < 1)) {
      //   errors.linkdInUrl = 'Provide a valid Linkedin URL';
      } else if (!adUserData.mrgStatus) {
        errors.mrgStatus = 'Maritial Status is required';
      } else if (!adUserData.emrPerson) {
        errors.emrPerson = 'Emergency Contact person is required';
      } else if (!adUserData.emrRel) {
        errors.emrRel = 'Emergency Relation is required';
      } else if (!adUserData.emrMobNum) {
        errors.emrMobNum = 'Emergency Contact Number is required';
      } else if (adUserData.emrMobNum && !phRegex.test(adUserData.emrMobNum)) {
        errors.emrMobNum = 'Invalid Emergency Contact Number';
      } else if (!adUserData.aStateCode) {
        errors.aStateCode = 'State is required';
      } else if (!adUserData.aAddress) {
        errors.aAddress = 'Address is required';
      } else if (!adUserData.aCity) {
        errors.aCity = 'City is required';
      } else if (!adUserData.aZip) {
        errors.aZip = 'Zipcode is required';
      } else if (!adUserData.nationalId) {
        errors.nationalId = 'National ID is required';
      } else if (adUserData.nationalId == 'DL' && !adUserData.dlNum) {
        errors.dlNum = 'Driving license is required';
      } else if (adUserData.nationalId == 'State ID' && !adUserData.stateIdNum) {
        errors.stateIdNum = 'State ID Number is required';
      } else if (adUserData.nationalId == 'Other' && !adUserData.otherNationalId) {
        errors.otherNationalId = 'Other National ID type is required';
      } else if (adUserData.nationalId == 'Other' && !adUserData.idNum) {
        errors.idNum = 'ID Number is required';
      } else if (!adUserData.adrsCheck && !adUserData.stCode) {
        errors.stCode = 'State is required';
      } else if (!adUserData.adrsCheck && !adUserData.adrs) {
        errors.adrs = 'Address is required';
      } else if (!adUserData.adrsCheck && !adUserData.city) {
        errors.city = 'City is required';
      } else if (!adUserData.adrsCheck && !adUserData.pincode) {
        errors.pincode = 'Zipcode is required';
      } else if (!adUserData.nationalIdIsdDate) {
        errors.nationalIdIsdDate = 'Issued Date is required';
      } else if (adUserData.nationalIdIsdDate > yesterday) {
        errors.nationalIdIsdDate = 'Please provide the valid date';
      } else if (!adUserData.nationalIdExpDate) {
        errors.nationalIdExpDate = 'Expiry Date is required';
      } else if (adUserData.nationalIdExpDate < tomorrow) {
        errors.nationalIdExpDate = 'Please provide the valid expiry date';
      }
    }
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }
  validateSecondStep = () => {
    const { currentStep } = this.state;
    const { nationality, visaStatus, visaStartDate, visaExpDate, sevisNum, position, receiptNum, cardNum, cardCheck, cardExpDate, cardRecieptNum, USCISNum, i94Num, i94ExpDate, workAuthStartDate, workAuthExpDate, passportNum, passportIsdDate, passportExpDate, passportIsdPlace, passDocNum } = this.state.workData;
    const i94Regex = /^[a-zA-Z0-9]{9,}$/;
    const uscisRegex = /^[a-zA-Z0-9]{6,}$/;
    const passportRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
    let errors = {};
    const tomorrow = getTomorrowDate();
    const yesterday = getYesterdayDate();
    if (currentStep === 2) {
      if (!nationality) {
        errors.nationality = 'Nationality is required';
      } else if (nationality != 'American' && !visaStatus) {
        errors.visaStatus = 'Visa Status is required';
      } else if (nationality != 'American' && !visaStartDate) {
        errors.visaStartDate = 'Visa Start date is required';
      } else if (nationality != 'American' && !visaExpDate) {
        errors.visaExpDate = 'Visa Expiry date is required';
      } else if (nationality != 'American' && (visaStatus == 'CPT' || visaStatus == 'OPT' || visaStatus == 'Stem OPT') && !sevisNum) {
        errors.sevisNum = 'Sevis Number is required';
      } else if (nationality != 'American' && (visaStatus == 'CPT') && !position) {
        errors.position = 'Position is required';
      } else if (nationality != 'American' && (visaStatus == 'H1B') && !receiptNum) {
        errors.receiptNum = 'Receipt Number is required';
      } else if (nationality != 'American' && (visaStatus == 'OPT' || visaStatus == 'Stem OPT') && !cardCheck && !cardNum) {
        errors.cardNum = 'Card Number is required';
      } else if (nationality != 'American' && (visaStatus == 'OPT' || visaStatus == 'Stem OPT') && cardCheck && !cardRecieptNum) {
        errors.cardRecieptNum = 'Card Receipt Number is required';
      } else if (nationality != 'American' && (visaStatus == 'OPT' || visaStatus == 'Stem OPT') && cardCheck && !cardExpDate) {
        errors.cardExpDate = 'Card Expected date is required';
      } else if (nationality != 'American' && (visaStatus == 'OPT' || visaStatus == 'Stem OPT') && cardCheck && cardExpDate < tomorrow) {
        errors.cardExpDate = 'Please provide the valid expiry date';
      } else if (nationality != 'American' && ((visaStatus == 'OPT' && !cardCheck) || visaStatus == 'Stem OPT' || visaStatus == 'H4EAD' || visaStatus == 'H4' || visaStatus == 'GCEAD' || visaStatus == 'GC' || visaStatus == 'L2' || visaStatus == 'Citizen' || visaStatus == 'Canadian' || visaStatus == 'Other') && !USCISNum) {
        // } else if (nationality != 'American' && ((visaStatus == 'OPT' && !cardCheck ) )) {
        errors.USCISNum = 'USCIS Number is required';
      } else if (nationality != 'American' && (visaStatus == 'OPT' || visaStatus == 'Stem OPT') && USCISNum && !uscisRegex.test(USCISNum)) {
        errors.USCISNum = 'USCIS should be at least 6 characters';
      } else if (nationality != 'American' && !i94Num) {
        errors.i94Num = 'i-94 Number is required';
      } else if (nationality != 'American' && i94Num && !i94Regex.test(i94Num)) {
        errors.i94Num = 'I94 should be at least 9 characters';
      } else if (nationality != 'American' && visaStatus == 'H1B' && !i94ExpDate) {
        errors.i94ExpDate = 'i-94 expiry date is required';
      } else if (nationality != 'American' && visaStatus == 'H1B' && i94ExpDate < tomorrow) {
        errors.i94ExpDate = 'Please provide the valid expiry date';
      } else if (nationality != 'American' && !workAuthStartDate && !cardCheck) {
        errors.workAuthStartDate = `${visaStatus == 'CPT' ? 'CPT Start Date is required' : 'Work Authorization Start Date is required'}`;
      } else if (nationality != 'American' && !workAuthExpDate && !cardCheck) {
        errors.workAuthExpDate = `${visaStatus == 'CPT' ? 'CPT Expiry Date is required' : 'Work Authorization Expiry Date is required'}`;
      } else if (nationality != 'American' && workAuthExpDate < workAuthStartDate && !cardCheck) {
        errors.workAuthExpDate = `${visaStatus == 'CPT' ? 'CPT Expiry date must be greater than CPT Start date' : 'Work Authorization Expiry date must be greater than Work Authorization Start date'}`;
      } else if (!passportNum) {
        errors.passportNum = 'Passport Number is required';
      } else if (passportNum && !passportRegex.test(passportNum)) {
        errors.passportNum = 'Please enter at least one number and one letter';
      } else if (!passportIsdDate) {
        errors.passportIsdDate = 'Passport Issued date is required';
      } else if (passportIsdDate > yesterday) {
        errors.passportIsdDate = 'Please provide the valid date';
      } else if (!passportExpDate) {
        errors.passportExpDate = 'Passport Expiry date is required';
      } else if (passportExpDate < tomorrow) {
        errors.passportExpDate = 'Please provide the valid expiry date';
      } else if (!passportIsdPlace) {
        errors.passportIsdPlace = 'Passport Issued Place is required';
      } else if (!passDocNum) {
        errors.passDocNum = 'Passport File Number is required';
      }
    }
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }
  validateThirdStep = () => {
    const { eduData } = this.state;
    const eduErrors = [];
    let thirdErrorIndex = null;
    eduData.forEach((field, index) => {
      eduErrors[index] = {};
      if (!field.degree) {
        eduErrors[index].degree = 'Degree is required';
        if (thirdErrorIndex === null) thirdErrorIndex = index
      } else if (!field.specialization) {
        eduErrors[index].specialization = 'Specialization is required';
        if (thirdErrorIndex === null) thirdErrorIndex = index
      } else if (!field.passoutYear) {
        eduErrors[index].passoutYear = 'Graduation Date is required';
        if (thirdErrorIndex === null) thirdErrorIndex = index
      } else if (!field.institution) {
        eduErrors[index].institution = 'Institution is required';
        if (thirdErrorIndex === null) thirdErrorIndex = index
      }
    });
    if (eduErrors.some(errors => Object.keys(errors).length > 0)) {
      this.setState({ eduErrors, thirdErrorIndex });
      return false;
    }
    this.setState({ eduErrors: [], thirdErrorIndex: null });
    return true;
  };
  validateCertStep = () => {
    const {crtfcData} = this.state;
    const crtfcErrors = [];
    let thirdErrorIndex = null;
    crtfcData.forEach((field, index) => {
      crtfcErrors[index] = {};
      if (!field.cName) {
        crtfcErrors[index].cName = 'Certificate Name is required';
        if (thirdErrorIndex === null) thirdErrorIndex = index;
      } else if (!field.cSpec) {
        crtfcErrors[index].cSpec = 'Certificate Specialization is required';
        if (thirdErrorIndex === null) thirdErrorIndex = index;
      } else if (!field.cBy) {
        crtfcErrors[index].cBy = 'Certified By is required';
        if (thirdErrorIndex === null) thirdErrorIndex = index;
      }
    });
    if (crtfcErrors.some((error) => Object.keys(error).length > 0)) {
      this.setState({crtfcErrors, thirdErrorIndex});
      return false;
    }
    this.setState({crtfcErrors: [], thirdErrorIndex: null});
    return true;
  };
  validateFourthStep = () => {
    const { empDetails } = this.state;
    const { expYrs, expMonths, jobTitle, skills, summary } = this.state.expData;
    let errors = {};
    let expErrors = [];
    let fourthErrorIndex = null;
    const tomorrow = getTomorrowDate();
    const yesterday = getYesterdayDate();
    if (expYrs.value == 0 && expMonths.value == 0) {
      if (skills.length === 0) {
        errors.skill = 'Primary Skills are required';
      } else if (!summary) {
        errors.summary = 'Summary is required';
      }
    } else if (jobTitle == null || !jobTitle.label) {
      errors.jobTitle = 'Job Title is required';
    } else if (skills.length === 0) {
      errors.skill = 'Primary Skills are required';
    } else if (!summary) {
      errors.summary = 'Summary is required';
    } else {
      empDetails && empDetails.length > 0 && empDetails.forEach((field, index) => {
        expErrors[index] = {};
        if (!field.empType) {
          expErrors[index].empType = 'Employement Type is required';
          if (fourthErrorIndex === null) fourthErrorIndex = index
        }
        if (!field.company) {
          expErrors[index].company = 'Current Company is required';
          if (fourthErrorIndex === null) fourthErrorIndex = index
        }
        if (field.empType == 'Contract' && !field.endClient) {
          expErrors[index].endClient = 'Client is required';
          if (fourthErrorIndex === null) fourthErrorIndex = index
        }
        if (!field.expStCode.value) {
          expErrors[index].expStCode = 'State is required';
          if (fourthErrorIndex === null) fourthErrorIndex = index
        }
        if (field.expStCode.value && !field.expLoc) {
          expErrors[index].expLoc = 'Location is required';
          if (fourthErrorIndex === null) fourthErrorIndex = index
        }
        if (!field.designation) {
          expErrors[index].designation = 'Designation is required';
          if (fourthErrorIndex === null) fourthErrorIndex = index
        }
        if (!field.rolesRes) {
          expErrors[index].rolesRes = 'Roles and Responsibilities is required';
          if (fourthErrorIndex === null) fourthErrorIndex = index
        }
        if (!field.expStartDate) {
          expErrors[index].expStartDate = 'Start Date is required';
          if (fourthErrorIndex === null) fourthErrorIndex = index
        } else if (field.expStartDate > yesterday) {
          expErrors[index].expStartDate = 'Please provide the valid date';
          if (fourthErrorIndex === null) fourthErrorIndex = index
        }
        if ((!field.presentEmployer) && !field.expEndDate) {
          expErrors[index].expEndDate = 'End Date is required';
          if (fourthErrorIndex === null) fourthErrorIndex = index
        }
      });
      if (expErrors.some(errors => Object.keys(errors).length > 0)) {
        this.setState({ expErrors, fourthErrorIndex, errors });
        return false;
      }
      this.setState({ expErrors: [], errors, fourthErrorIndex: null });
      return Object.keys(errors).length === 0;
    }
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }
  removeImage = () => {
    const stepperData = this.getStepData();
    this.setState(prevState => ({ [stepperData]: { ...prevState[stepperData], 'file': null, imageUrl: null, iconPath: '' }, errors: {} }));
    if (this.fileInput.current) {
      this.fileInput.current.value = '';
    }
  }
  handleNext = async () => {
    if (this.state.currentStep == 1 && this.validateFirstStep()) {
      this.personalApiCall();
    }
    if (this.state.currentStep == 2 && this.validateSecondStep()) {
      this.workApiCall();
    }
    if (this.state.currentStep == 3 && this.validateThirdStep()) {
      if (this.state.isChecked) {
        if (this.validateCertStep()) {
          this.eduApiCall();
          this.crtfcApiCall();
        }
      } else {
        this.eduApiCall();
      }
    }
    if (this.state.currentStep == 4 && this.validateFourthStep()) {
      this.expApiCall();
    }
  };
  personalApiCall = async () => {
    const { fName, lName, email, altEmail, dob, mobCc, mobNum, altMobCc, altMobNum, emrMobCc, emrMobNum, linkdInUrl, ssnNum, ssnExpDate, file, gender, mrgStatus, referedBy, stateCode, usaId, aCountryCode, aStateCode, aAddress, aArea, aCity, aZip, iconPath, iPath, cCode, stCode, adrs, area, city, pincode, nAdrsId, adrsCheck, emrPerson, emrRel, emrEmail, nationalId, dlNum, stateIdNum, otherNationalId, idNum, nationalIdIsdDate, nationalIdExpDate, userData } = this.state.adUserData;
    const {viewData} = this.state;
    const usaStates = aCountryCode ? States[aCountryCode] : [];
    const cntryObj = aCountryCode ? Countries.find(item => item.code == aCountryCode) : {};
    const aStatesObj = usaStates && usaStates.length > 0 ? usaStates.find(item => item.stateCode == aStateCode) : {};
    // =================
    const stArr = cCode ? States[cCode] : [];
    const cnObj = cCode ? Countries.find(item => item.code == cCode) : {};
    const stObj = stCode && stArr && stArr.length > 0 ? stArr.find(item => item.stateCode == stCode) : {};
    const endUserData = {
      org: viewData.org,
      orgName: viewData.orgName,
      orgCode: viewData.orgCode,
      obId: '',
      obName: '',
      obCode: '',
      name: (fName && lName) ? fName + ' ' + lName : (fName ? fName : lName),
      sName: '',
      fName,
      lName,
      mobCc,
      mobNum,
      mobCcNum: mobNum ? mobCc + ' ' + mobNum : '',
      emID: email,
      refUID: '',
      ecNum: emrMobNum ? emrMobCc + ' ' + emrMobNum : '',
      ecPer: emrPerson,
      ecRelt: emrRel,
      ecEml: emrEmail,
      altMobCc,
      altMobNum,
      altMobCcNum: altMobNum ? altMobCc + ' ' + altMobNum : '',
      altEmID: altEmail,
      dob,
      dobStr: dob,
      gender,
      mStatus: mrgStatus,
      referedBy,
      ssn: ssnNum,
      ssnExpDt: ssnExpDate,
      ssnExpDtStr: ssnExpDate,
      uStatus: 'Active',
      wrkUrls: linkdInUrl ? linkdInUrl : [],
      // iconPath,
      // iPath,
      unidType: nationalId == 'Other' ? otherNationalId : nationalId,
      usaNatID: nationalId == 'DL' ? dlNum : nationalId == 'State ID' ? stateIdNum : idNum,
      unidIssDt: nationalIdIsdDate,
      unidIssDtStr: nationalIdIsdDate,
      unidExpDt: nationalIdExpDate ? nationalIdExpDate : '',
      unidExpDtStr: nationalIdExpDate ? nationalIdExpDate : '',
      isRes: adrsCheck
    }
    const prevData = {
      org: '', orgName: '', orgCode: '', obId: '', obName: '', obCode: '', team: '', tName: '', tCode: '',
      name: userData.name, sName: '', fName: userData.fName, lName: userData.lName, mobCc: userData.mobCc, mobNum: userData.mobNum, mobCcNum: userData.mobCcNum,
      emID: userData.emID, refUID: '', ecNum: userData.ecNum, ecPer: userData.ecPer, ecRelt: userData.ecRelt, ecEml: userData.ecEml, altMobCc: userData.altMobCc, altMobNum: userData.altMobNum, altMobCcNum: userData.altMobCcNum, altEmID: userData.altEmID,
      dob: userData.dobStr, dobStr: userData.dobStr, gender: userData.gender, mStatus: userData.mStatus, referedBy: '', ssn: userData.ssn, ssnExpDt: userData.ssnExpDtStr, ssnExpDtStr: userData.ssnExpDtStr, uStatus: 'Active', wrkUrls: userData.wrkUrls,
      unidType: userData.unidType, usaNatID: userData.usaNatID, unidIssDt: userData.unidIssDt, unidIssDtStr: userData.unidIssDtStr, unidExpDt: userData.unidExpDt, unidExpDtStr: userData.unidExpDtStr, isRes: userData.isRes
    }
    const usaAdrsObj = {
      id: usaId,
      org: viewData.org,
      orgName: viewData.orgName,
      orgCode: viewData.orgCode,
      adrsType: 'USA RES',
      adrsName: '',
      hNum: aAddress,
      area: aArea,
      aLocality: '',
      zip: aZip,
      city: aCity,
      cityCode: '',
      state: aStatesObj.stateName,
      sCode: aStateCode,
      country: cntryObj.value,
      cCode: aCountryCode,
      delFlag: false
    }
    const adrsObj = {
      id: nAdrsId,
      org: viewData.org,
      orgName: viewData.orgName,
      orgCode: viewData.orgCode,
      adrsType: 'USA ID',
      adrsName: '',
      hNum: adrs,
      area: area,
      aLocality: '',
      zip: pincode,
      city: city,
      cityCode: '',
      state: stObj.stateName,
      sCode: stCode,
      country: cnObj.value,
      cCode: cCode,
      delFlag: adrsCheck ? true : false
    }
    const endUserAdrsData = adrsCheck && nAdrsId ? [usaAdrsObj, adrsObj] : adrsCheck ? [usaAdrsObj] : [usaAdrsObj, adrsObj];

    const adrsArrData = userData.address
    let adrsPrvData = adrsArrData && adrsArrData.length > 0 ? adrsArrData.map((item, i) => {
      return {
        id: item._id,
        org: viewData.org,
        orgName: viewData.orgName,
        orgCode: viewData.orgCode,
        team: viewData.team,
        tName: viewData.tName,
        tCode: viewData.tCode,
        adrsType: i == 0 ? 'USA RES' : 'USA ID',
        adrsName: '',
        hNum: item.hNum,
        area: item.area,
        aLocality: '',
        zip: item.zip,
        city: item.city,
        cityCode: '',
        state: item.state,
        sCode: item.sCode,
        country: item.country,
        cCode: item.cCode,
        delFlag: i == 0 ? false : adrsCheck ? true : false
      }
    }) : [];
    if (JSON.stringify(endUserData) == JSON.stringify(prevData) && JSON.stringify(endUserAdrsData) == JSON.stringify(adrsPrvData)) {
      if (this.stepperInstance) {
        this.stepperInstance.next();
        this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
        this.removeData(1);
      }
    } else {
      // const endUserAdrsData = [usaAdrsObj, ...(!adrsCheck ? [adrsObj] : [])];    
      const data = new FormData();
      // const img = iconPath ? {} : file;
      data.append('endUserData', JSON.stringify(endUserData));
      data.append('endUserAdrsData', JSON.stringify(endUserAdrsData));
      // data.append('iconFile', img);
      const accTkn = await localForage.getItem('accesstoken');
      const ctpb2bat = accTkn?.value || {};
      const ctpb2batoken = ctpb2bat.ctpb2batoken
      const headers = { headers: { ctpb2batoken } };
      this.handleApiCall(data, headers);
    }

  }
  handleApiCall = async (data, headers) => {
    this.setState({ disable: true });
    const id = this.state.imgid ? this.state.imgid : this.props.id;
    axios.put(config.putB2BUpdateCnsltantPrsnlInfoAPI + this.props.id + '/' + id, data, headers)
      .then((res) => {
        setHeadersToken(res);
        if (res.status == '200') {
          if (this.stepperInstance) {
            this.stepperInstance.next();
            this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
            this.removeData(1);
          }
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.status == '105') {
          this.setState({ errMsg: err.response.data.resData.message, disable: false });
        }
      });
  }
  workApiCall = () => {
    const { nationality, visaStatus, visaStartDate, visaExpDate, sevisNum, position, receiptNum, USCISNum, i94Num, i94ExpDate, passportNum, passportIsdDate, passportExpDate, passportIsdPlace, passDocNum, workAuthStartDate, workAuthExpDate, workAuthId, workAuthData, cardNum, cardExpDate, cardRecieptNum, cardCheck } = this.state.workData;
    const {viewData} = this.state;
    const reqBody = {
      id: workAuthData && workAuthData._id ? workAuthData._id : '',
      org: viewData.org,
      orgName: viewData.orgName,
      orgCode: viewData.orgCode,
      nationality,
      visaStatus: visaStatus ? visaStatus : '',
      visaStDt: visaStartDate ? visaStartDate : '',
      visaStDtStr: visaStartDate ? visaStartDate : '',
      visaExpDt: visaExpDate ? visaExpDate : '',
      visaExpDtStr: visaExpDate ? visaExpDate : '',
      uscisNum: USCISNum ? USCISNum : '',
      li94Num: i94Num ? i94Num : '',
      i94ExpDt: i94ExpDate ? i94ExpDate : '',
      i94ExpDtStr: i94ExpDate ? i94ExpDate : '',
      wrkAuthStrtDt: workAuthStartDate,
      wrkAuthStrtDtStr: workAuthStartDate,
      wrkAuthExpDt: workAuthExpDate,
      wrkAuthExpDtStr: workAuthExpDate,
      psprtNum: passportNum,
      psprtIssDt: passportIsdDate,
      psprtIssDtStr: passportIsdDate,
      psprtExpDt: passportExpDate,
      psprtExpDtStr: passportExpDate,
      psprtIssPlace: passportIsdPlace,
      psprtDocNum: passDocNum,
      cardNum: cardNum,
      cardExpDt: cardCheck ? cardExpDate : '',
      cardExpDtStr: cardCheck ? cardExpDate : '',
      cardRcptNum: cardCheck ? cardRecieptNum : '',
      sevisNum: sevisNum ? sevisNum : '',
      position: position ? position : '',
      receiptNum: receiptNum ? receiptNum : ''
    }
    const prevData = {
      id: workAuthData && workAuthData._id ? workAuthData._id : '',
      org: viewData.org,
      orgName: viewData.orgName,
      orgCode: viewData.orgCode,
      nationality: workAuthData && workAuthData._id ? workAuthData.nationality : '',
      visaStatus: workAuthData && workAuthData._id ? workAuthData.visaStatus : '',
      visaStDt: workAuthData && workAuthData._id ? workAuthData.visaStDtStr : '',
      visaStDtStr: workAuthData && workAuthData._id ? workAuthData.visaStDtStr : '',
      visaExpDt: workAuthData && workAuthData._id ? workAuthData.visaExpDtStr : '',
      visaExpDtStr: workAuthData && workAuthData._id ? workAuthData.visaExpDtStr : '',
      uscisNum: workAuthData && workAuthData._id ? workAuthData.uscisNum : '',
      li94Num: workAuthData && workAuthData._id ? workAuthData.li94Num : '',
      i94ExpDt: workAuthData && workAuthData._id ? workAuthData.i94ExpDtStr : '',
      i94ExpDtStr: workAuthData && workAuthData._id ? workAuthData.i94ExpDtStr : '',
      wrkAuthStartDt: workAuthData && workAuthData._id ? workAuthData.wrkAuthStrtDtStr : '',
      wrkAuthStartDtStr: workAuthData && workAuthData._id ? workAuthData.wrkAuthStrtDtStr : '',
      wrkAuthExpDt: workAuthData && workAuthData._id ? workAuthData.wrkAuthExpDtStr : '',
      wrkAuthExpDtStr: workAuthData && workAuthData._id ? workAuthData.wrkAuthExpDtStr : '',
      psprtNum: workAuthData && workAuthData._id ? workAuthData.psprtNum : '',
      psprtIssDt: workAuthData && workAuthData._id ? workAuthData.psprtIssDtStr : '',
      psprtIssDtStr: workAuthData && workAuthData._id ? workAuthData.psprtIssDtStr : '',
      psprtExpDt: workAuthData && workAuthData._id ? workAuthData.psprtExpDtStr : '',
      psprtExpDtStr: workAuthData && workAuthData._id ? workAuthData.psprtExpDtStr : '',
      psprtIssPlace: workAuthData && workAuthData._id ? workAuthData.psprtIssPlace : '',
      psprtDocNum: workAuthData && workAuthData._id ? workAuthData.psprtDocNum : '',
      cardNum: workAuthData && workAuthData._id ? workAuthData.cardNum : '',
      cardExpDt: workAuthData && workAuthData._id ? workAuthData.cardExpDtStr : '',
      cardExpDtStr: workAuthData && workAuthData._id ? workAuthData.cardExpDtStr : '',
      cardRcptNum: workAuthData && workAuthData._id ? workAuthData.cardRcptNum : '',
      sevisNum: workAuthData && workAuthData._id ? workAuthData.sevisNum : '',
      position: workAuthData && workAuthData._id ? workAuthData.position : '',
      receiptNum: workAuthData && workAuthData._id ? workAuthData.receiptNum : '',
    }
    if (JSON.stringify(reqBody) != JSON.stringify(prevData)) {
      this.props.PostB2BCnsltantWorkInfo(reqBody, this.props.id, (resObj) => {
        if (resObj.status == '200') {
          if (this.stepperInstance) {
            this.stepperInstance.next();
            this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
            this.removeData(2);
          }
        }
      })
    } else {
      if (this.stepperInstance) {
        this.stepperInstance.next();
        this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
        this.removeData(2);
      }
    }
  }
  eduApiCall = () => {
    const {viewData} = this.state
    let edcnData = this.state.eduData && this.state.eduData.map((item) => {
      return {
        id: item.id ? item.id : '',
        org: viewData.org,
        orgName: viewData.orgName,
        orgCode: viewData.orgCode,
        team: viewData.team,
        tName: viewData.tName,
        tCode: viewData.tCode,
        degree: item.degree,
        dSpcl: item.specialization,
        noi: item.institution,
        dYear: item.passoutYear ? moment(item.passoutYear).format('YYYY') : '',
        dMonth: item.passoutYear ? moment(item.passoutYear).format('MM') : '',
        dScore: '',
        dSeq: item.degree === 'Doctoral' ? 1 : item.degree === 'Masters' ? 2 : item.degree === 'Bachelors' ? 3 : 4
      };
    });
    let prevEdnData = this.state.edctnData && this.state.edctnData.length && this.state.edctnData.map((item) => {
      return {
        id: item._id ? item._id : '',
        org: viewData.org,
        orgName: viewData.orgName,
        orgCode: viewData.orgCode,
        team: viewData.team,
        tName: viewData.tName,
        tCode: viewData.tCode,
        degree: item.degree,
        dSpcl: item.dSpcl,
        noi: item.noi,
        dYear: item.dYear ? moment(item.dYear).format('YYYY') : '',
        dMonth: item.dMonth ? moment(item.dMonth).format('MM') : '',
        dScore: '',
        dSeq: item.degree === 'Doctoral' ? 1 : item.degree === 'Masters' ? 2 : item.degree === 'Bachelors' ? 3 : 4
      };
    });
    const reqBody = { edcnData }
    const prevData = { edcnData: prevEdnData }
    if (JSON.stringify(reqBody) != JSON.stringify(prevData)) {
      this.props.PostB2BCnsltantEduInfo(reqBody, this.props.id, (resObj) => {
        if (resObj.status == '200') {
          if (this.stepperInstance) {
            this.stepperInstance.next();
            this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
            this.removeData(3);
          }
        }
      })
    } else {
      if (this.stepperInstance) {
        this.stepperInstance.next();
        this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
        this.removeData(3);
      }
    }
  }
  crtfcApiCall = () => {
    const {viewData} = this.state
    let certsData =
      this.state.crtfcData &&
      this.state.crtfcData.map((item) => {
        return {
          id: item.id ? item.id : '',
          org: viewData.org,
          orgName: viewData.orgName,
          orgCode: viewData.orgCode,
          team: viewData.team,
          tName: viewData.tName,
          tCode: viewData.tCode,
          cName: item.cName,
          cSpec: item.cSpec,
          cBy: item.cBy,
          cDt: item.cDt ? moment(item.cDt).format('MM YYYY') : '',
          cAbt: item.cAbt,
        };
      });
    let prevEdnData =
      this.state.crtfcnsData &&
      this.state.crtfcnsData.length &&
      this.state.crtfcnsData.map((item) => {
        return {
          id: item._id ? item._id : '',
          org: viewData.org,
          orgName: viewData.orgName,
          orgCode: viewData.orgCode,
          team: viewData.team,
          tName: viewData.tName,
          tCode: viewData.tCode,
          cName: item.cName,
          cSpec: item.cSpec,
          cBy: item.cBy,
          dYear: item.dYear ? moment(item.dYear).format('YYYY') : '',
          dMonth: item.dMonth ? moment(item.dMonth).format('MM') : '',
          cAbt: item.cAbt,
        };
      });
    const reqBody = {certsData};
    const prevData = {certsData: prevEdnData};
    if (JSON.stringify(reqBody) != JSON.stringify(prevData)) {
      this.props.PostB2BCnsltantCrtfcInfo(reqBody, this.props.id, (resObj) => {});
    }
  };
  // handleSubmit = () => {
  //   if (this.state.currentStep == 4 && this.validateFourthStep()) {
  //     this.expApiCall();
  //   }
  // }
  expApiCall = () => {
    const { expYrs, expMonths, jobTitle, skills, summary, insurence, expResData } = this.state.expData;
    const { empDetails, isShowEmpDetails, viewData } = this.state;
    const totalExp = (expYrs.value * 12) + expMonths.value;
    // const sumry = summary.getCurrentContent().getPlainText();
    // const pSmry = sumry.split('\n');
    // const prfsSrm = pSmry.toString();
    const skillString = skills && skills.length > 0 ? skills.map(skill => skill.value).join(', ') : '';
    const primSkillsArr = skills && skills.length > 0 ? skills.map(item => item.value) : [];
    const emps = empDetails && empDetails.length > 0 ? empDetails.map((item) => {
      const pSkillString = item.pSkills && item.pSkills.length > 0 ? item.pSkills.map(skill => skill.value).join(', ') : '';
      // const descr = item.description.getCurrentContent().getPlainText();
      // const jDesc = descr.split('\n');
      // const desc = jDesc.toString();
      let skillsArr = item.pSkills && item.pSkills.length > 0 ? item.pSkills.map(item => item.value) : [];
      return {
        _id: item.id,
        present: item.presentEmployer,
        empType: item.empType,
        company: item.company,
        endClient: item.endClient,
        fDt: item.expStartDate,
        fDtStr: item.expStartDate,
        tDt: item.expEndDate,
        tDtStr: item.expEndDate,
        country: item.expCcode.label,
        cCode: item.expCcode.code,
        state: item.expStCode.stateName,
        sCode: item.expStCode.stateCode,
        city: item.expLoc,
        skills: pSkillString,
        skillsArr,
        designation: item.designation,
        rolesRes: item.rolesRes,
        desc: item.description,
      };
    }) : [];
    const reqBody = {
      id: expResData._id ? expResData._id : '',
      org: viewData.org,
      orgName: viewData.orgName,
      orgCode: viewData.orgCode,
      // invitationId: this.props.id,
      expYears: expYrs.value,
      expMonths: expMonths.value,
      tExp: totalExp,
      jobTitle: jobTitle?.value ? jobTitle.value : 'Fresher',
      primSkills: skillString,
      primSkillsArr,
      secSkills: '',
      secSkillsArr: [],
      prfsSrm: summary,
      healthIns: insurence == 'true' ? true : false,
      emps: isShowEmpDetails ? emps : []
    }
    const empDtls = expResData.emps && expResData.emps.length > 0 ? expResData.emps : [];
    const prevEmp = empDtls && empDtls.length > 0 ? empDtls.map((item) => {
      return {
        _id: item._id,
        present: item.present,
        empType: item.empType,
        company: item.company,
        endClient: item.endClient,
        fDt: item.fDtStr,
        fDtStr: item.fDtStr,
        tDt: item.tDtStr,
        tDtStr: item.tDtStr,
        country: item.country,
        cCode: item.cCode,
        state: item.state,
        sCode: item.sCode,
        city: item.city,
        skills: item.skills,
        skillsArr: [item.skills],
        designation: item.designation,
        rolesRes: item.rolesRes,
        desc: item.desc,
      };
    }) : [];
    const prevData = {
      id: expResData._id ? expResData._id : '', 
      org: viewData.org,
      orgName: viewData.orgName,
      orgCode: viewData.orgCode,
      expYears: Number(expResData.expYears), expMonths: Number(expResData.expMonths), tExp: Number(expResData.tExp), jobTitle: expResData.jobTitle, primSkills: expResData.primSkills,
      primSkillsArr: expResData.primSkillsArr, secSkills: '', secSkillsArr: [], prfsSrm: expResData.prfsSrm, healthIns: expResData.healthIns, emps: prevEmp
    }
    if (JSON.stringify(reqBody) != JSON.stringify(prevData)) {
      this.props.PostB2BCnsltantExpInfo(reqBody, this.props.id, (resObj) => {
        if (resObj.status == '200') {
          if (this.stepperInstance) {
            this.stepperInstance.next();
            this.setState(prevState => ({ currentStep: prevState.currentStep + 1, editBtn: true, submitBtn: true, sucMsg: false }));
            this.getInvtnData(this.props.id);
          }
        }
      });
    } else {
      if (this.stepperInstance) {
        this.stepperInstance.next();
        this.setState(prevState => ({ currentStep: prevState.currentStep + 1, editBtn: true, submitBtn: true, sucMsg: false }));
        this.getInvtnData(this.props.id);
      }
    }
  }
  removeData = (step) => {
    const { viewData } = this.state;
    const workAuthInfo = viewData && viewData.workAuths && viewData.workAuths.length > 0 ? true : false;
    const eduInfo = viewData && viewData.education && viewData.education.length > 0 ? true : false;
    const crtfcInfo = viewData && viewData.certs && viewData.certs.length > 0 ? true : false;
    const expInfo = viewData && viewData.wrkExps && viewData.wrkExps.length > 0 ? true : false;
    switch (step) {
      case 1:
        if (!workAuthInfo) {
          this.setState({
            workData: { ...this.state.workData, ...Object.keys(this.state.workData).reduce((acc, key) => ({ ...acc, [key]: '' }), { uscisCheck: false, cardCheck: false, isWorkCheck: false, workAuthData: {} }) }
          });
        }
        break;
      case 2:
        if (!eduInfo) {
          this.setState({
            eduData: [{ degree: '', specialization: '', institution: '', passoutYear: '', isDropdown: true, id: '' }],
          });
        } else if (!crtfcInfo) {
          this.setState({
            crtfcData: [{cName: '', cSpec: '', cBy: '', cDt: '', isDropdown: true, cAbt: '', id: ''}],
          });
        }
        break;
      case 3:
        if (!expInfo) {
          const countryCode = countryObj?.code;
          const states = States[countryCode];
          this.setState({
            expData: {
              expResData: {},
              expYrs: { label: 0, value: 0 },
              expMonths: { label: 0, value: 0 },
              jobTitle: null,
              skills: [],
              skillOptions: [],
              summary: '',
              insurence: 'false',
            },
            empDetails: [{
              id: 1,
              presentEmployer: false,
              empType: '',
              company: '',
              endClient: '',
              expCcode: countryObj,
              expStateArr: states,
              expStCode: stateObj,
              expLoc: '',
              designation: '',
              rolesRes: '',
              expStartDate: '',
              expEndDate: '',
              pSkills: [],
              // description: EditorState.createEmpty()
              description: ''
            }],
          });
        }
        break;
      default:
        break;
    }
  }
  handlePrevious = () => {
    if (this.stepperInstance) {
      this.stepperInstance.previous();
      this.setState(prevState => ({ currentStep: prevState.currentStep - 1 }));
      this.getInvtnData(this.props.id);
    }
  };
  // ========New Review Profile========
  handleSubmit = () => {
    this.reviewApiCall();
  }
  reviewApiCall = () => {
    const reqBody = { status: 'Submitted' };
    this.props.putB2BInvitationsStatusUpdate(this.props.id, reqBody, (resObj) => {
      if (resObj.status == '200') {
        if (this.stepperInstance) {
          this.setState({ editBtn: false, submitBtn: false, sucMsg: true });
          this.getInvtnData(this.props.id);
        }
      }
    });
  }
  reviewEditClick = (key) => {
    if (this.stepperInstance) {
      this.setState({ currentStep: key });
      this.stepperInstance.to(key);
    }
  }
  handleCheckboxChange = (e) => {
    this.setState({isChecked: e.target.checked}); // Update state with checked value
  };
  // ========New Review Profile========
  handleCreateSkill = (type) => {
    const { cmnValue } = this.state;
    if (!cmnValue) {
      this.setState({ cmnErrMsg: `${type} is required` });
    } else {
      const reqBody = { type, name: cmnValue.replace(/\s+$/, '')}
      this.props.PostB2BDropdownsCreateAPI(reqBody, (resObj) => {
        if (resObj.status == '200') {
          this.setState({ cmnErrMsg: `${type} Created Successfully` });
          setTimeout(() => {
            this.getSkillsList();
            this.setState({ cmnModal: false, cmnValue: '', cmnErrMsg: '' })
          }, 3000);
        } else if (resObj.status == '103') this.setState({ cmnErrMsg: resObj.resData.message });
        else {
          this.setState({ cmnErrMsg: `${type} Create Failed` });
          setTimeout(() => {
            this.getSkillsList();
            this.setState({ cmnModal: false, cmnValue: '', cmnErrMsg: '' });
          }, 3000);
        }
      })
    }
  }

  handleShowSsn = () => this.setState({ showSsn: !this.state.showSsn });
  
  render() {
    return (
      <ConsultantCreateComponent
        state={this.state}
        stepperRef={this.stepperRef}
        fileInput={this.fileInput}
        setStateData={this.setStateData}
        handleOnchange={this.handleOnchange}
        removeImage={this.removeImage}
        handleNext={this.handleNext}
        handlePrevious={this.handlePrevious}
        handleAddField={this.handleAddField}
        handleDeleteField={this.handleDeleteField}
        handleFieldChange={this.handleFieldChange}
        handleExpchange={this.handleExpchange}
        handleCreateSkill={this.handleCreateSkill}
        // editorChange={this.editorChange}
        handleYearChange={this.handleYearChange}
        reviewEditClick={this.reviewEditClick}
        handleSubmit={this.handleSubmit} 
        handleCheckboxChange={this.handleCheckboxChange}
        handleShowSsn={this.handleShowSsn}
        />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  GetB2BInvitationView: (id, callback) => dispatch(GetB2BInvitationView(id, callback)),
  PostB2BCnsltantWorkInfo: (body, id, callback) => dispatch(PostB2BCnsltantWorkInfo(body, id, callback)),
  PostB2BCnsltantEduInfo: (body, id, callback) => dispatch(PostB2BCnsltantEduInfo(body, id, callback)),
  PostB2BCnsltantExpInfo: (body, id, callback) => dispatch(PostB2BCnsltantExpInfo(body, id, callback)),
  DeleteB2BCnsltantEduInfo: (id, callback) => dispatch(DeleteB2BCnsltantEduInfo(id, callback)),
  DeleteB2BCnsltantExpInfo: (id, callback) => dispatch(DeleteB2BCnsltantExpInfo(id, callback)),
  putB2BInvitationsStatusUpdate: (recordId, body, callback) => dispatch(putB2BInvitationsStatusUpdate(recordId, body, callback)) ,
  PostB2BCnsltantCrtfcInfo: (body, id, callback) => dispatch(PostB2BCnsltantCrtfcInfo(body, id, callback)),
  DeleteB2BCnsltantCrtfcInfo: (id, callback) => dispatch(DeleteB2BCnsltantCrtfcInfo(id, callback)),
  PostB2BDropdownsCreateAPI: (body, callback) => dispatch(PostB2BDropdownsCreateAPI(body, callback)),
    PostB2BDropdownsListAPI: (body, callback) => dispatch(PostB2BDropdownsListAPI(body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(ConsultantCreateClass);