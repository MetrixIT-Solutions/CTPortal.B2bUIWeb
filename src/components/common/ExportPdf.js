/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';

export const exportPdf = (goalsList) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const tableColumn = ["Category", "Goal & Accomplishments", "Start Date", "Goal Status", "Completed On", "Goal Type", "Review Details"];
  const tableRows = [];

(goalsList).map(details => {
  const reviewDetails =
    `Reviewer: ${details.gRvrName || ''}\n` +
    `Reviewed On: ${details.grDtStr ? moment(details.grDtStr).format('DD MMM, YYYY') : '' || ''}\n` +
    `Rating: ${details.grRating || ''}\n` +
    `Review: ${details.gReview || ''}`;

  const sDate = details.gsDtStr[0] ? moment(details.gsDtStr[0]).format('DD MMM, YYYY') : '';
  const cDate = details.gsDtStr[1] ? moment(details.gsDtStr[1]).format('DD MMM, YYYY') : '';

  const rDetails = details.gStatus === 'Reviewed' ? reviewDetails : '';
  const userDetails = [details.gCategory, details.gAccmnts, sDate, details.gStatus, cDate, details.gType, rDetails];
  tableRows.push(userDetails);
});


  const columnWidths = {
    0: { cellWidth: 20 }, // Category
    1: { cellWidth: 40 }, // Goal & Accomplishments
    2: { cellWidth: 25 }, // Start Date
    3: { cellWidth: 20 }, // Goal Status
    4: { cellWidth: 25 }, // Completed On
    5: { cellWidth: 20 }, // Goal Type
    6: { cellWidth: 40 }, // Review Details
  };
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 10,
    margin: { top: 10, left: 10, right: 10, bottom: 10 },
    styles: {
      fontSize: 8,
      cellPadding: 3,
      overflow: 'linebreak',
      valign: 'top',
      tableWidth: 'wrap',
    },
    columnStyles: columnWidths,
    didParseCell: function (data) {
      if (data.column.index === 1 && data.cell.section === 'body') {
        data.cell.styles.textColor = [0, 0, 255];
        data.cell.styles.fontStyle = 'normal';
      }
    }
  });

  const currentDateTime = moment().format('YYYYMMDD-HHmm');

  const fileName = `${goalsList[0]?.euName}-${currentDateTime}.pdf`;
  doc.save(fileName);
  // const x = doc.output('blob');
  // const y = URL.createObjectURL(x);
  // window.open(y);
}
