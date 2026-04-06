/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import moment from 'moment';
import phoneIcon from '../../assets/images/icons/phone.png';
import emailIcon from '../../assets/images/icons/new-post.png';
import webIcon from '../../assets/images/icons/domain.png';
import locIcon from '../../assets/images/icons/place-marker.png';

import configData from '../../../config/config.json';

// Constants
// const ITEMS_PER_PAGE = 8;
// Styles
const styles = StyleSheet.create({
  page: {
    paddingTop: 100,
    paddingBottom: 80,
    paddingHorizontal: 20,
    fontSize: 12,
    fontFamily: 'Helvetica',
    position: 'relative',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1 solid #ccc',
    paddingBottom: 5,
  },
  logo: {
    // width: 100,
    height: 30,
  },
  textContainer: {
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    height: 50,
    left: 20,
    right: 20,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
    borderTop: '2 solid #00ADD4',
    paddingTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    fontSize: 9,
  },
  icon: {
    width: 10,
    height: 10,
    marginRight: 4,
  },
  watermark: {
    position: 'absolute',
    top: 400,
    left: 120,
    width: 300,
    opacity: 0.08
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableHeader: {
    backgroundColor: '#0074a6',
    color: '#fff',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 6,
    fontSize: 9,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  colCategory: { flex: 23 },
  colGoals: { flex: 32 },
  colStart: { flex: 12 },
  colCompleted: { flex: 12 },
  colReview: { flex: 26 },
  reviewRow: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  reviewPair: {
    flexDirection: 'row',
    fontSize: 9,
    marginBottom: 2,
  },
  reviewLabel: {
    color: '#595957',
    marginRight: 4,
  },
});
const estimateItemsPerPage = ({
  pageHeight = 842,     // A4 height in points
  topPadding = 60,
  bottomPadding = 40,
  headerHeight = 80,
  footerHeight = 60,
  itemHeight = 70,
}) => {
  const usableHeight = pageHeight - (topPadding + bottomPadding + headerHeight + footerHeight);
  return Math.floor(usableHeight / itemHeight);
};

const ExportPdfComponent = ({ data = [] }) => {
  // const itemsPerPage = estimateItemsPerPage({});
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const renderPages = () =>
    Array.from({ length: totalPages }).map((_, pageIndex) => {
      const pageItems = data.slice(
        pageIndex * itemsPerPage,
        (pageIndex + 1) * itemsPerPage
      );
      return (
        <Page size="A4" style={styles.page} key={pageIndex}>
          {/* Header */}
          <Image fixed style={styles.watermark} src={configData.base64Logo} />
          <View style={styles.header} fixed>
            <Image style={styles.logo} src={configData.base64Logo} />
            <View style={styles.textContainer}>
              <View style={styles.reviewPair}>
                <Text style={styles.reviewLabel}>Employee Name:</Text>
                <Text>{pageItems?.[0]?.euName || ''}</Text>
              </View>
              <View style={styles.reviewPair}>
                <Text style={styles.reviewLabel}>Designation:</Text>
                <Text>Software Developer</Text>
              </View>
              <View style={styles.reviewPair}>
                <Text style={styles.reviewLabel}>Reporting Authority:</Text>
                <Text>Divya Reddy</Text>
              </View>
            </View>
          </View>
          {/* Watermark */}
          <View style={[styles.tableRow, styles.tableHeader]} fixed>
            <Text style={[styles.tableCell, styles.colCategory]}>Goal Info</Text>
            <Text style={[styles.tableCell, styles.colGoals]}>Goal & Accomplishments</Text>
            <Text style={[styles.tableCell, styles.colStart]}>Start Date</Text>
            <Text style={[styles.tableCell, styles.colCompleted]}>End Date</Text>
            <Text style={[styles.tableCell, styles.colReview]}>Review Details</Text>
          </View>
          {pageItems?.length > 0 && pageItems.map((item, i) => {
            const sDate = item.gsDtStr?.[0] ? moment(item.gsDtStr[0]).format('DD MMM, YYYY') : '';
            const cDate = item.gsDtStr?.[1] ? moment(item.gsDtStr[1]).format('DD MMM, YYYY') : '';
            return (
              <View style={styles.tableRow} key={i}>
                <View style={[styles.tableCell, styles.colCategory]}>
                  <Text style={{ marginBottom: 2 }}>{item.gCategory}</Text>
                  <View style={styles.reviewPair}>
                    <Text style={styles.reviewLabel}>Status: </Text>
                    <Text>{item.gStatus}</Text>
                  </View>
                  <View style={styles.reviewPair}>
                    <Text style={styles.reviewLabel}>Type: </Text>
                    <Text>{item.gType}</Text>
                  </View>
                </View>
                <View style={[styles.tableCell, styles.colGoals]}>
                  <Text wrap>{item.gAccmnts}</Text>
                </View>
                <View style={[styles.tableCell, styles.colStart]}>
                  <Text>{sDate}</Text>
                </View>
                <View style={[styles.tableCell, styles.colCompleted]}>
                  <Text>{cDate}</Text>
                </View>
                <View style={[styles.tableCell, styles.colReview]}>
                  {item.gStatus === 'Reviewed' ? (
                    <>
                      <View style={styles.reviewRow}>
                        <View style={styles.reviewPair}>
                          <Text style={styles.reviewLabel}>Reviewer:</Text>
                          <Text>{item.gRvrName}</Text>
                        </View>
                        <View style={styles.reviewPair}>
                          <Text style={styles.reviewLabel}>Reviewed On:</Text>
                          <Text>{item.grDtStr ? moment(item.grDtStr).format('DD MMM, YYYY') : ''}</Text>
                        </View>
                        <View style={styles.reviewPair}>
                          <Text style={styles.reviewLabel}>Rating:</Text>
                          <Text>{item.grRating}</Text>
                        </View>
                        <View>
                          <Text style={styles.reviewLabel}>Review:</Text>
                          <Text wrap>{item.gReview}</Text>
                        </View>
                      </View>
                    </>
                  ) : ''}
                </View>
              </View>
            );
          })}
          {/* <View style={{ height: 10, borderBottomWidth: 0 }} /> */}
          <View style={styles.footer} fixed>
            <View style={styles.contactRow}>
              <View style={styles.contactItem}>
                <Image src={phoneIcon} style={styles.icon} />
                <Text>+1 (469) 645-8884</Text>
              </View>
              <View style={styles.contactItem}>
                <Image src={emailIcon} style={styles.icon} />
                <Text>info@teksolveit.com</Text>
              </View>
              <View style={styles.contactItem}>
                <Image src={webIcon} style={styles.icon} />
                <Text>www.teksolveit.com</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <Image src={locIcon} style={styles.icon} />
              <Text>6701 Carmel Road, Suite #100, Charlotte, North Carolina 28226</Text>
            </View>
          </View>
        </Page>
      );
    });

  return <Document>{renderPages()}</Document>;
};

export default ExportPdfComponent;