/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TemplateCheckListComponent from "../../components/templates/TemplateCheckListComponent";
import localForage from "../../hooks/localForage";
import config from "../../../config/apis.json";
import { postB2BTemplateCheckListAPI, postB2BTemplateCheckListApproveAPI, postGetSignedPdfPaths } from "../../actions/templates/TemplatesActions";
import { setHeadersToken } from "../../hooks/apihooks";
import configJson from '../../../config/config.json';

class TemplateCheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkListArr: [],
      totalCheckListArr: [],
      checkData: {},
      errMsg: '',
      actTab: "0",
      title: "Documents",
      updateModal: false,
      docObj: {},
      cmnValue: '',
      openIndex: null,
      isprImage: false,
      removedImages: [],
      existingImages: [],
      newImages: [],
      tableModal: false,
      errors: [{}],
      isDisable: false,
      tdtgData: [],
      userInfo :{},
      isApprModal: false,
      sectionModal: false,
      errMsgs: {},
      rolesObj: {},
      tCat: this.props.name,
      schId: [],
      pdfShow: false,
      pdfUrl: '',
      pdfMessage: ''
    };
  }
  componentDidMount = async () => {
    this.geCheckListdata();
    const UsrData = await localForage.getItem('userInfo');
    const userInfo = UsrData.value || {};
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    this.setState({ userInfo, rolesObj: { ...rolesObj, appAcc } });
  };
  setStateData = (data) => this.setState({ ...data });
  geCheckListdata = () => {
    const reqBody = { lid: this.props.id, tempCat: this.props.name };
    this.props.postB2BTemplateCheckListAPI(reqBody, (resObj) => {
      if (resObj.status == "200") {
        const resData = resObj.resData.result;
        const totalCheckListArr = this.setData(resData);
        this.setTab(totalCheckListArr);
        this.setState({ totalCheckListArr });
      } else {
        this.setState({ totalCheckListArr: [] });
      }
    });
  };
  setTab = (checkListArr) => {
    const docArr = checkListArr && checkListArr.length > 0 ? checkListArr.filter((a) => a.tdDataType == "Image" || a.tdDataType == "File" || a.tdDataType == "Image/File") : [];
    this.setState({ checkListArr: docArr, actTab: "0" });
  };
  handleSelectTab = (actTab) => {
    const { totalCheckListArr } = this.state;
    const docArr = totalCheckListArr && totalCheckListArr.length > 0 ? totalCheckListArr.filter((a) => a.tdDataType == "Image" || a.tdDataType == "File" || a.tdDataType == "Image/File") : [];
    const detailArr = totalCheckListArr && totalCheckListArr.length > 0 ? totalCheckListArr.filter((a) => a.tdDataType == "Text" || a.tdDataType == "Number" || a.tdDataType == "Boolean" || a.tdDataType == "Dropdown" || a.tdDataType == "Date" || a.tdDataType == "Table" || a.tdDataType == "Section") : [];
    if (actTab == "0") {
      this.setState({ actTab, checkListArr: docArr, docObj: {} });
    } else {
      this.setState({ actTab, checkListArr: detailArr, docObj: {} });
    }
  };
  getFileType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    const mimeTypes = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      pdf: "application/pdf",
      txt: "text/plain",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
    return mimeTypes[extension] || "application/octet-stream";
  };
  setData = (resData) => {
    return resData && resData.length > 0
      ? resData.map((item, i) => {
        let img = item.tdfPaths
          .map((item1) => {
            if (item1) {
              const fileType = this.getFileType(item1);
              return new File([''], item1, { type: fileType });
            }
            return null;
          }).filter(Boolean);
          const tdtgData = item.tdtgData && item.tdtgData?.length > 0 ? item.tdtgData
        : (item.tdDataType === 'Table') ? [{
          ...item.tdData.reduce((obj, col) => {
            obj[col] = '';
            return obj;
          }, {})
        }]: item.tdFlag ? item.tdtgData : item?.tdDataObj?.tableArr.map(item1 => [{
          ...item1,
          data: [item1.data],
        }]);        
        return {
          ...item,
          name: this.toCamelCase(item.tdId, item.tdLevel, i),
          value: item.tdgData || (item.tdDataType === 'Text' && item.tdData?.length > 0 ? item.tdData[0] : ''),
          displayImgs: (item.tdDataType === 'Image' || item.tdDataType === 'File' || item.tdDataType === 'Image/File') && item.tdfPaths?.length > 0 ? img : [],
          tdtgData
        };
      })
      : [];
  };
  toCamelCase = (name, tdLevel, i) => {
    return name.replace(/(?:^\w|[A-Z]|\b\w|\s+\w)/g, (match, index) => (index === 0 ? match.toLowerCase() : match.toUpperCase())).replace(/\s+/g, "") + tdLevel + i;
  };
  tempChange = (e) => {
    const { type, files } = e.target;
    const MAX_TOTAL_SIZE_MB = 5;
    this.setState((prevState) => {
      if (type === "file") {
        const newFiles = Array.from(files);
        const currentDisplayImgs = prevState.docObj.displayImgs || [];
        const combinedFiles = [...currentDisplayImgs, ...newFiles];
          const totalSizeBytes = combinedFiles.reduce((sum, file) => {
          return file?.size ? sum + file.size : sum;
        }, 0);  
        if (totalSizeBytes > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
          return { errMsg: `Total file size must be less than ${MAX_TOTAL_SIZE_MB}MB.`, isDisable: true };
        }
        const existingFiles = currentDisplayImgs.filter((file) => file?.name?.startsWith("http") || file?.name?.startsWith("https"));
        const totalFiles = currentDisplayImgs?.length + newFiles?.length;
        if (totalFiles > prevState.docObj.tdLimit) {
          return { errMsg: `You can only upload up to ${prevState.docObj.tdLimit} files.` };
        }
        return {
          docObj: {
            ...prevState.docObj,
            displayImgs: combinedFiles,
          },
          existingImages: existingFiles,
          newImages: [...prevState.newImages, ...newFiles],
          errMsg: '',
          isDisable:false
        };
      }
    });
  };
  removeImage = (index) => {
    this.setState((prevState) => {
      const updatedImages = prevState.docObj.displayImgs.filter((_, idx) => idx !== index);
      const removedImage = prevState.docObj.displayImgs[index];
      const removedImages = [...prevState.removedImages, removedImage];
      const existingImages = updatedImages?.length === 0 ? [] : prevState.docObj.displayImgs.filter((_, idx) => idx !== index);
      return {
        docObj: { ...prevState.docObj, displayImgs: updatedImages },
        removedImages,
        existingImages,
        errMsg: "",
      };
    });
  };
  handleOpenEdit = (item, i) => {
    if (item.tdDataType == 'Table') {
      const tdtgData = item.tdtgData && item.tdtgData?.length > 0 ? item.tdtgData
        : [{
          ...item.tdData.reduce((obj, col) => {
            obj[col] = '';
            return obj;
          }, {})
        }];
      this.setState({ tableModal: true, openIndex: null, docObj: item, tdtgData });
    } else if(item.tdDataType == 'Section'){
      // tdtgData.push([{item[i]}]);
    //   const tdtgData = item.tdFlag ? item.tdtgData : Object.values(item?.tdDataObj?.tableArr.reduce((acc, item1) => {
    //     acc[item1.tableStructure] = acc[item1.tableStructure] || [];
    //     const formattedItem = {
    //     ...item1,
    //     data: [item1.data],
    //   };
    //   acc[item1.tableStructure].push(formattedItem);

    //     return acc;
    // }, {}));
      const tdtgData = item.tdFlag ? item.tdtgData : item?.tdDataObj?.tableArr.map(item1 => [{
        ...item1,
        data: [item1.data],
      }]);

      this.setState({ sectionModal: true, openIndex: null, docObj: item, tdtgData });
    } else {
      this.setState({ openIndex: i, errMsg: "", docObj: item });
    }
  };
  tableChange = (e, rowIndex, col, item) => {
    const { value } = e.target;
    this.setState(prevState => {
      if (!item || !item.tdtgData[rowIndex]) {
        return null;
      }
      item.tdtgData[rowIndex][col] = value;
        const updatedErrors = [...(prevState.errors || [])];
      if (updatedErrors[rowIndex]?.[col]) {
        updatedErrors[rowIndex] = {
          ...updatedErrors[rowIndex],
          [col]: "",
        };
      }
      return { errors: updatedErrors };
    });
  };
  addTable = (item) => {
    this.setState(prevState => {
      let hasErrors = false;
      const newErrors = prevState?.errors?.slice();
      const lastRowIndex = item?.tdtgData?.length - 1;
      const lastRow = item.tdtgData[lastRowIndex];
      Object.keys(lastRow).forEach((key) => {
        if (!lastRow[key].trim()) {
          hasErrors = true;
          if (!newErrors[lastRowIndex]) newErrors[lastRowIndex] = {};
          newErrors[lastRowIndex][key] = `${key} is required`;
        }
      });
      if (hasErrors) {
        return { errors: newErrors };
      }
      const newRow = item.tdData?.reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {}) || {};
      item.tdtgData = [...item.tdtgData, newRow];
      return {
        errors: [...prevState.errors, {}],
      };
    });
  };

  deleteTable = (item) => {
    this.setState(prevState => {
      const currentItem = item;
      if (!currentItem || !currentItem.tdtgData || currentItem.tdtgData.length === 0) {
        return null;
      }
        currentItem.tdtgData = currentItem.tdtgData.slice(0, -1);
        const updatedErrors = [...(prevState.errors || [])];
      if (updatedErrors.length > 0) {
        updatedErrors.splice(currentItem.tdtgData.length, 1);
      }
      return {
        errors: updatedErrors,
      };
    });
  };
  editClick = (item, i) => {
    const { tableModal, sectionModal } = this.state;
    const tdDataType = (item.tdDataType == "Image" || item.tdDataType == "File" || item.tdDataType == "Image/File" || item.tdDataType == "Table" || item.tdDataType == "Section") ? true : false;
    const fileDataType = (item.tdDataType == "Image" || item.tdDataType == "File" || item.tdDataType == "Image/File") ? true : false;
    if (item.tdMandatory && !tdDataType && !item.value) {
      this.setState({ errMsg: `${item.tdId} is required.`, openIndex: i});
    } else if (item.tdMandatory && fileDataType && item.displayImgs?.length == 0) {
      this.setState({ errMsg: `${item.tdId} is required.` });
    } else if (item.tdDataType === "Table") {
      const isvalid = this.validation('Table', item, i);
      if (!isvalid) {
        this.handleSendData(item, tdDataType);
      }
    } else if (item.tdDataType === "Section") {
      const isvalid = this.validation('Section', item, i);            
      if (!isvalid) {
        this.handleSendData(item, tdDataType);
      }
    } else {
      this.handleSendData(item, tdDataType);
    }
  };
  handleSendData = async (item, tdDataType) => {    
    const { removedImages, existingImages, newImages, tdtgData, totalCheckListArr } = this.state;
    const orgD = totalCheckListArr?.length > 0 && totalCheckListArr.filter(item => (item.tdLevel === 'Organization' && !item.tdFlag));
    const crgD = totalCheckListArr?.length > 0 && totalCheckListArr.filter(item => (item.tdLevel === 'Consultant' && !item.tdFlag));        
    const tempoStatus = orgD.length > 0 && orgD.length === 1 ? 'Completed' :'Started';
    const tempcStatus = crgD.length > 0 && crgD.length === 1 ? 'Completed' :'Started';
    const toObj = item.tdLevel === 'Organization' && !item.tdFlag ? { tdpCount: 1, tempoStatus } : {};
    const tcObj = item.tdLevel === 'Consultant' && !item.tdFlag ? { tdpCount: 1, tempcStatus } : {};
    this.setState({ isDisable: true, errMsg:'' });
    const reqBody = {
      tempCat: item.tempCat,
      lid: item.lid,
      level: item.tdLevel,
      tdfPaths: tdDataType ? (existingImages?.length > 0 ? existingImages.map((item) => item.name) : []) : [],
      tdfpDel: tdDataType ? (removedImages?.length > 0 ? removedImages.map((item) => item.name) : []) : [],
      givData: (item.tdDataType == "Text" || item.tdDataType == "Number" || item.tdDataType == "Boolean" || item.tdDataType == "Dropdown" || item.tdDataType == "Date") ? item.value : "",
      tdtgData: item.tdtgData,
      ...tcObj, ...toObj
    };
    const rqData={
      tempCat: item.tempCat,
      lid: item.lid,
      level: item.tdLevel,
      tdfPaths: tdDataType ? (existingImages?.length > 0 ? existingImages.map((item) => item.name) : []) : [],
      givData: (item.tdDataType == "Text" || item.tdDataType == "Number" || item.tdDataType == "Boolean" || item.tdDataType == "Dropdown" || item.tdDataType == "Date") ? item.value : "",
      tdtgData: item.tdtgData
    }    
    const iData = {
      tempCat: item.tempCat,
      lid: item.lid,
      level: item.tdLevel,
      tdfPaths: item.tdfPaths,
      givData: item.tdgData,
      tdtgData: item.tdtgData
    }    
    const valid = JSON.stringify(rqData) != JSON.stringify(iData);
    const img = newImages?.length && newImages.length > 0 ? newImages : [];
    const data = new FormData();
    var x;
    for (x = 0; x < img?.length; x++) {
      data.append("files", img[x]);
    }
    data.append("tmData", JSON.stringify(reqBody));
    const accTkn = await localForage.getItem("accesstoken");
    const ctpb2bat = accTkn?.value || {};
    const ctpb2batoken = ctpb2bat.ctpb2batoken;
    const headers = { headers: { ctpb2batoken } };
    if (valid) {
      this.handleApiCall(data, headers, item);
    } else {
      // toast.warn('No Changes')
      // this.setState({ tableModal: false, sectionModal: false });
      this.handleApiCall(data, headers, item);
    }
  }
  validation = (type, item, chekIndex) => {
    const { tdtgData } = this.state;
    if (type === 'Table') {
      const newErrors = [];
      for (let rowIndex = 0; rowIndex < item.tdtgData.length; rowIndex++) {
        const row = item.tdtgData[rowIndex];
        const rowErrors = {};
        for (let key of Object.keys(row)) {
          if (item.tdMandatory && !row[key]?.trim()) {
            rowErrors[key] = `${key} is required`;
          }
        }
        if (Object.keys(rowErrors).length > 0) {
          newErrors[rowIndex] = rowErrors;
        }
      }
      if (newErrors.length > 0) {
        this.setState({ errors: newErrors });
        return true;
      }
      this.setState({ errors: [] });
      return false;
    } else {
      let errMsgs = {};
      let hasErrors = false;
      item.tdtgData.forEach((item, mainIndex) => {
        item.forEach((tbItem, tbIndex) => {
          tbItem?.data?.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {              
              if (cell.mandatory && (!cell.value || cell.value.trim() === "")) {
                const key = `${chekIndex}-${mainIndex}-${tbIndex}-${rowIndex}-${cellIndex}`;
                errMsgs[key] = `${cell.label} is required`;
                hasErrors = true;
              }
            });
          });
        });
      });
      this.setState((prevState) => ({ ...prevState, errMsgs }));
      return hasErrors;
    }
  };
  handleApiCall = async (data, headers, item) => {
    const { totalCheckListArr, checkListArr } = this.state;    
    axios
      .put(config.putB2BTemplateCheckListUpdateAPI + item._id, data, headers)
      .then(async (res) => {
        setHeadersToken(res);
        if (res.status == "200") {
          toast.success(`${item.tdId} Updated`)
          const index = checkListArr.findIndex((a) => a._id === item._id);
          if (index > -1) {
            const resData = res.data?.resData?.result;
            let displayImgs = [];
            if (resData?.tdfPaths?.length > 0) {
              displayImgs = resData.tdfPaths.map((path) => {
                if (path) {
                  const fileType = this.getFileType(path);
                  return new File([""], path, { type: fileType });
                }
                return null;
              }).filter(Boolean);
            }
            checkListArr[index] = { ...resData, value: item.value ? item.value : '', name: item.name, displayImgs };
            const cIndex = totalCheckListArr?.length > 0 && totalCheckListArr.findIndex(item1 => item1._id === item._id);
            cIndex >= 0 ? totalCheckListArr[cIndex] = { ...resData, value: item.value ? item.value : '', name: item.name, displayImgs} : totalCheckListArr;
          }
          this.setState({ openIndex: null, totalCheckListArr: [...totalCheckListArr], updateModal: false, errMsg: "", removedImages: [], existingImages: [], newImages: [], isDisable: false, tableModal: false, sectionModal: false });
        } else {
          toast.error("Checklist Update Failed")
          this.setState({ errMsg: "Checklist Update Failed", isDisable: false, tableModal: false,sectionModal: false });
        }
      })
      .catch((err) => {
        this.setState({ errMsg: "Checklist Update Failed" });
        // if (err.response && err.response.data && err.response.data.status == '103') {
        //   this.setState({ errMsg: err.response.data.resData.message, disable: false });
        // } else {
        //   this.setState({ disable: false });
        // }
      });
  };
  handleClosePopup = () => {
    this.setState({ isprImage: false, docObj: {}, errMsg: "", tableModal: false, errors: {} });
  };
  handleDownloadFiles = async (files) => {
    if (files?.length > 0) {
      files.forEach((file, index) => {
        const link = document.createElement('a');
        setTimeout(() => {
          if (file.name.includes('temp-docs')) {
            fetch(file.name).then(response => response.blob()).then(blob => {
              link.href = URL.createObjectURL(blob);
              this.setFileDownLoad(file.name, link);
            }).catch(error => console.error('Download failed:', error));
          } else {
              link.href = file.name;
              this.setFileDownLoad(file.name, link);
          }
        }, index * 1000);
      });
    }
  };
  setFileDownLoad = (filename, link) => {
    link.download = filename.split('/').pop();;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  subArrAddBtnCLick = (mainIndex, rowIndex, tbIndex, checklistObj, checkIndex) => {    
    const { errMsgs } = this.state;
    const newChecklistArr = [...this.state.checkListArr];
    const arrIndex = newChecklistArr.findIndex(item => item._id === checklistObj._id);
    const newData = [...checklistObj.tdtgData];
    const currentTable = newData[mainIndex][tbIndex];
    const lastRow = currentTable.data[currentTable.data.length - 1];
    let isRowValid = true;
    let newErrors = { ...errMsgs };
    lastRow.forEach((cell, cellIndex) => {
      if (cell.mandatory) {
        if (!cell.value || cell.value.trim() === "" || (cell.valueType === "Dropdown" && cell.value === "")) {
          isRowValid = false;
          newErrors[`${checkIndex}-${mainIndex}-${tbIndex}-${rowIndex}-${cellIndex}`] = `${cell.label} is required`;
        } else {
          delete newErrors[`${checkIndex}-${mainIndex}-${tbIndex}-${rowIndex}-${cellIndex}`];
        }
      }
    });
    this.setState({ errMsgs: newErrors });
    if (!isRowValid) {
      return;
    }
    const newRow = lastRow.map((cell) => ({...cell,value: ""}));
    newData[mainIndex][tbIndex].data.push(newRow);        
    checklistObj.tdtgData = newData;
    newChecklistArr[arrIndex] = checklistObj;        
    this.setState({ checkListArr: newChecklistArr });
  };
  handleAddVertTable = (tbItem, tbIndex, mainIndex, checklistObj, checkIndex) => {    
    const { errMsgs } = this.state;
    const newChecklistArr = [...this.state.checkListArr];
    const arrIndex = newChecklistArr.findIndex(item => item._id === checklistObj._id);
    const newData = [...checklistObj.tdtgData];    
    const currentGroup = newData[mainIndex];
    const currentTable = currentGroup?.[tbIndex];
    let isRowValid = true;
    let newErrors = { ...errMsgs };
    if (currentTable) {
      currentTable.data.forEach((row, rowIndex) =>
        row.forEach((cell, cellIndex) => {
          if (cell.mandatory && !cell.value) {
            newErrors[`${checkIndex}-${mainIndex}-${tbIndex}-${rowIndex}-${cellIndex}`] = `${cell.label} is required`;
            isRowValid = false;
          }
        })
      );
    }
    this.setState({ errMsgs: newErrors });
    if (!isRowValid) {
      return;
    }
    const baseHeading = currentGroup?.[0]?.subHeading?.replace(/\s\d+$/, '') || tbItem.subHeading;
    const nextIndex = (currentGroup?.length || 0) + 1;
    const newTable = {
      ...tbItem, subHeading: `${baseHeading} ${nextIndex}`, data: tbItem.data.map(row => row.map(cell => ({ ...cell, value: "" })))
    };    
    if (currentGroup && currentGroup.length < parseInt(tbItem.limit)) {
      newData[mainIndex].push(newTable);
    }
    checklistObj.tdtgData = newData;
    newChecklistArr[arrIndex] = checklistObj;
    this.setState({ checkListArr: newChecklistArr });
  };

  
  handleDltVertTable = (tbIndex, mainIndex, checklistObj) => {
    let newChecklistArr = [...this.state.checkListArr];
    const arrIndex = newChecklistArr.findIndex(item => item._id === checklistObj._id);
    const updatedTdtgData = [...checklistObj.tdtgData];
    const upData = updatedTdtgData?.[mainIndex] && updatedTdtgData[mainIndex]
    if (upData && upData.length > 1) {
      upData.splice(tbIndex, 1);
    }
    newChecklistArr[arrIndex] = {...checklistObj, tdtgData: updatedTdtgData};
    this.setState({ checkListArr: newChecklistArr, errMsgs:{} });
  };
  handleHorTableChange = (e, mainIndex, tbIndex, rowIndex, cellIndex, checklistObj, checkIndex) => {
    const { value } = e.target;
    this.setState((prevState) => {
      const updatedTdtgData = checklistObj.tdtgData;
      updatedTdtgData[mainIndex][tbIndex].data[rowIndex][cellIndex].value = value;      
      const updatedErrors = { ...prevState.errMsgs };
      const cell = updatedTdtgData[mainIndex][tbIndex].data[rowIndex][cellIndex];
      if (cell.mandatory && value) {
        delete updatedErrors[`${checkIndex}-${mainIndex}-${tbIndex}-${rowIndex}-${cellIndex}`];
      }
      return { /*tdtgData: updatedTdtgData,*/ errMsgs: updatedErrors };
    });
  };
  handleVerTableChange = (e, mainIndex, tbIndex, tIndex, trIndex, checklistObj, checkIndex) => {
    const { value } = e.target;
    this.setState((prevState) => {
      // const updatedTdtgData = [...prevState.tdtgData];
      const updatedTdtgData = checklistObj.tdtgData;
      updatedTdtgData[mainIndex][tbIndex].data[tIndex][trIndex].value = value;
      const updatedErrors = { ...prevState.errMsgs };
      const errorKey = `${checkIndex}-${mainIndex}-${tbIndex}-${tIndex}-${trIndex}`;
      if (value.trim()) {
        delete updatedErrors[errorKey];
      }

      return { tdtgData: updatedTdtgData, errMsgs: updatedErrors };
    });
  };
  subArrDltBtnCLick = (mainIndex, tbIndex, rowIndex, checklistObj) => {
    let newChecklistArr = [...this.state.checkListArr];
    const updatedTdtgData = [...checklistObj.tdtgData];
    const arrIndex = newChecklistArr.findIndex(item => item._id === checklistObj._id);
    const upData = updatedTdtgData?.[mainIndex]?.[tbIndex]?.data
    if (upData && upData.length > 1) {
      upData.splice(rowIndex, 1);
    }
    newChecklistArr[arrIndex] = { ...checklistObj, tdtgData: updatedTdtgData, };
    this.setState({ checkListArr: newChecklistArr, errMsgs:{} });
  };
  
  handleApprove = () => {
    const {docObj, checkListArr} = this.state;
    this.props.postB2BTemplateCheckListApproveAPI(docObj._id, (resObj) => {
      if (resObj.status == "200") {
        const resData = resObj.resData.result;
        const index = checkListArr.findIndex((a) => a._id === docObj._id);
        checkListArr[index] = {...checkListArr[index], ...resData};
        this.setState({isDisable: false, isApprModal: false});
      } else {
        this.setState({ isApprModal: true });
      }
    });
  };
  handleOnChange = (e, index) => {
    const { value } = e.target;
    const updatedCheckListArr = [...this.state.checkListArr];
    updatedCheckListArr[index] = {...updatedCheckListArr[index],value: value};
    this.setState({ checkListArr: updatedCheckListArr, errMsg:'' });
  };
  handleClickExpand = (item) => {
    const d = this.state.schId.find(item1 => item1 == item._id);
    const schId = d ? this.state.schId.filter(item1 => item1 !== item._id) : [...this.state.schId, item._id];
    this.setState({schId});
  }
  handleKeyDown = (e, item, i) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.editClick(item, i);
    }
  }
  handleOfrLtrPdfView = async (item) => {
    const pArr = item.split(configJson.fileBk);
    if (pArr.length > 1) {
      const reqBody = { filepaths: [pArr[1]] };
      this.props.postGetSignedPdfPaths(reqBody, resObj => {
        if (resObj.status == '200') {
          const signedUrl = resObj.resData.result.urls[0];
          if (signedUrl !== 'null') {
            this.setState({ pdfShow: true, pdfUrl: signedUrl, pdfMessage: ''});
          } else {
            this.setState({ pdfShow: true, pdfUrl: '', pdfMessage: 'File not Found'});
          }
        } else {
          this.setState({ pdfShow: true, pdfUrl: '', pdfMessage: 'File not Found'});
        }
      });
    } else this.setState({ pdfShow: true, pdfUrl: item, pdfMessage: ''});
  }
  render() {
    return (
      <TemplateCheckListComponent
        state={this.state}
        tempChange={this.tempChange}
        setStateData={this.setStateData}
        removeImage={this.removeImage}
        editClick={this.editClick}
        handleOpenEdit={this.handleOpenEdit}
        handleSelectTab={this.handleSelectTab}
        handleDownloadFiles={this.handleDownloadFiles}
        handleClosePopup={this.handleClosePopup}
        tableChange={this.tableChange}
        addTable={this.addTable}
        deleteTable={this.deleteTable}
        handleApprove={this.handleApprove}
        handleAddVertTable={this.handleAddVertTable}
        handleDltVertTable={this.handleDltVertTable}
        handleHorTableChange={this.handleHorTableChange}
        handleVerTableChange={this.handleVerTableChange}
        subArrAddBtnCLick={this.subArrAddBtnCLick}
        subArrDltBtnCLick={this.subArrDltBtnCLick}
        handleOnChange={this.handleOnChange}
        handleClickExpand={this.handleClickExpand}
        handleKeyDown={this.handleKeyDown}
        handleOfrLtrPdfView={this.handleOfrLtrPdfView}
      />
    );
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BTemplateCheckListAPI: (body, callback) => dispatch(postB2BTemplateCheckListAPI(body, callback)),
  postB2BTemplateCheckListApproveAPI: (id, callback) => dispatch(postB2BTemplateCheckListApproveAPI(id, callback)),
  postGetSignedPdfPaths: (body, callback) => dispatch(postGetSignedPdfPaths(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(TemplateCheckList);
