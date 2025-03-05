
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import { 
  createFirstWorksheet, 
  createSecondWorksheet, 
  createThirdWorksheet 
} from './worksheetCreators';
import { processEntityData } from './dataProcessor';

interface ExportData {
  [key: string]: any;
}

/**
 * Main function to export entity data to Excel
 */
export const exportToExcel = async (entities: ExportData[] | ExportData) => {
  console.log('exportToExcel - Received data to export:', entities);
  
  // Create a new workbook
  const workbook = new ExcelJS.Workbook();
  
  // Create worksheets
  const worksheet1 = createFirstWorksheet(workbook);
  const worksheet2 = createSecondWorksheet(workbook);
  const worksheet3 = createThirdWorksheet(workbook);
  
  // Handle both single entity and multiple entities
  const dataArray = Array.isArray(entities) ? entities : [entities];
  
  console.log('exportToExcel - Processing data array with length:', dataArray.length);
  
  // Process each entity
  dataArray.forEach((data, index) => {
    console.log(`exportToExcel - Processing entity ${index}:`, data);
    processEntityData(data, worksheet1, worksheet2, worksheet3);
  });

  console.log('exportToExcel - Generating Excel file with multiple sheets');
  
  // Generate the Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `entity_information_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
};
