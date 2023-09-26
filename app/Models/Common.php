<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;
use PHPExcel; 
use PHPExcel_IOFactory;
use PHPExcel_Cell;
use PHPExcel_Shared_Date;
use PHPExcel_Style_NumberFormat;

class Common extends Model
{
    // get function details
    public function getFunctionData( $userId, $projectId, $functionId ){
		$data = DB::select(' EXEC uspGetDecompositionFunctionProject ?,?',array($userId,$projectId));
		$index = 0;
		foreach ($data as $key => $values) {
		    if($values->DecompositionFunctionProjectID==$functionId){
		        $index = $key+1;
		    }
		}
		return $index;
    }
    public function getPhaseData( $userId, $projectId, $phaseId ){
		$data = DB::select(' EXEC uspGetDecompositionPhaseProject ?,?',array($userId,$projectId));
		$index = 0; 
		foreach ($data as $key => $values) {
		 
		    if($values->DecompositionPhaseProjectID==$phaseId){
		        $index = $key+1;
		    }
		}
		return $index;
    }
    public function readXLS($inputFileName = ''){
		try {
			$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
			$objReader 	   = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel   = $objReader->load($inputFileName);
			
			//  Get worksheet dimensions
			$sheet1     		 = $objPHPExcel->getSheet(0); // CapabilityModelingProjects
			$highestRowSheet1    = $sheet1->getHighestRow(); 
			$highestColumnSheet1 = $sheet1->getHighestColumn(); 	

			$data = [];
			//  Loop through each row of the worksheet in turn
			for ($row = 2; $row <= $highestRowSheet1; $row++){ 
			    //  Read a row of data into an array
			    $sheet1Header = $sheet1->rangeToArray('A1'. ':' . $highestColumnSheet1 . '1',NULL,TRUE,FALSE);
			    $sheet1Row = $sheet1->rangeToArray('A' . $row . ':' . $highestColumnSheet1 . $row,NULL,TRUE,FALSE);

			    $capabilityModelingProjects = array_combine($sheet1Header[0], $sheet1Row[0]);
			    $data['CapabilityModelingProjects'][] = $capabilityModelingProjects;
			    //$column_A_Value = $sheet1->getCell("A$row")->getValue();//column A
			    //$data['CapabilityModelingProjects'][][$sheet1->getCell("A1")->getValue()] = $column_A_Value;
			   
			}
			$sheet2     		 = $objPHPExcel->getSheet(1); // Scoring Criteria
			$highestRowSheet2    = $sheet2->getHighestRow(); 
			$highestColumnSheet2 = $sheet2->getHighestColumn();

			for ($row = 2; $row <= $highestRowSheet2; $row++){ 
				$sheet2Header = $sheet2->rangeToArray('A1' . ':' . $highestColumnSheet2 .'1',NULL,TRUE,FALSE);

				$sheet2Row = $sheet2->rangeToArray('A' . $row . ':' . $highestColumnSheet2 . $row,NULL,TRUE,FALSE);
				
				$scoringCriteria = array_combine($sheet2Header[0], $sheet2Row[0]);
				$data['ScoringCriteria'][] = $scoringCriteria;
				
			}

			$sheet3     		 = $objPHPExcel->getSheet(2); // Process Level 1
			$highestRowSheet3    = $sheet3->getHighestRow(); 
			$highestColumnSheet3 = $sheet3->getHighestColumn();
			

			for ($row = 2; $row <= $highestRowSheet3; $row++){ 
				$sheet3Header = $sheet3->rangeToArray('A1' . ':' . $highestColumnSheet3 .'1',NULL,TRUE,FALSE);

				$sheet3Row = $sheet3->rangeToArray('A' . $row . ':' . $highestColumnSheet3 . $row,NULL,TRUE,FALSE);
				
				$processLevel1 = array_combine($sheet3Header[0], $sheet3Row[0]);
				$data['ProcessLevel1'][] = $processLevel1;
				
			}

			$sheet4     		 = $objPHPExcel->getSheet(3); // Process Decomposition
			$highestRowSheet4    = $sheet4->getHighestRow(); 
			$highestColumnSheet4 = $sheet4->getHighestColumn();

			for ($row = 2; $row <= $highestRowSheet4; $row++){ 
				$sheet4Header = $sheet4->rangeToArray('A1' . ':' . $highestColumnSheet4 .'1',NULL,TRUE,FALSE);

				$sheet4Row = $sheet4->rangeToArray('A' . $row . ':' . $highestColumnSheet4 . $row,NULL,TRUE,FALSE);
				
				$processDecomposition = array_combine($sheet4Header[0], $sheet4Row[0]);
				$data['ProcessDecomposition'][] = $processDecomposition;
				
			}
			return $data;
		}catch(\Exception $e){
			die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
		}
	}
	public function readXLSJsonRoot($inputFileName = ''){
		try {
			$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
			$objReader 	   = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel   = $objReader->load($inputFileName);
			
			//  Get worksheet dimensions
			$sheet1     		 = $objPHPExcel->getSheet(0); // CapabilityModelingProjects
			$highestRowSheet1    = $sheet1->getHighestRow(); 
			$highestColumnSheet1 = $sheet1->getHighestColumn(); 	

			$sheet1Header = $sheet1->rangeToArray('A1'. ':' . $highestColumnSheet1 . '1',NULL,TRUE,FALSE);

			$data = [];
			//  Loop through each row of the worksheet in turn
			for ($row = 2; $row <= $highestRowSheet1; $row++){ 
			    //  Read a row of data into an array
			    $sheet1Row = $sheet1->rangeToArray('A' . $row . ':' . $highestColumnSheet1 . $row,NULL,TRUE,FALSE);

			    $capabilityModelingProjects = array_combine($sheet1Header[0], $sheet1Row[0]);
			    $data['CapabilityModelingProjects'][] = $capabilityModelingProjects;
			   
			   
			}
			$sheet2     		 = $objPHPExcel->getSheet(1); // Scoring Criteria
			$highestRowSheet2    = $sheet2->getHighestRow(); 
			$highestColumnSheet2 = $sheet2->getHighestColumn();

			$sheet2Header = $sheet2->rangeToArray('A1' . ':' . $highestColumnSheet2 .'1',NULL,TRUE,FALSE);

			for ($row = 2; $row <= $highestRowSheet2; $row++){ 	
				$sheet2Row = $sheet2->rangeToArray('A' . $row . ':' . $highestColumnSheet2 . $row,NULL,TRUE,FALSE);
				if($sheet2Row[0][0]){
					$scoringCriteria = array_combine($sheet2Header[0], $sheet2Row[0]);
					
					//$resultSC = array_filter( $scoringCriteria, 'strlen' );
					$resultSC = $scoringCriteria;
					unset($resultSC['Scoring Criteria Column']);
					$data['ScoringCriteria'][] = $resultSC;
				}
				
			}
			
			$sheet3     		 = $objPHPExcel->getSheet(2); // Process Level 1
			$highestRowSheet3    = $sheet3->getHighestRow(); 
			$highestColumnSheet3 = $sheet3->getHighestColumn();
			
			$sheet3Header = $sheet3->rangeToArray('A1' . ':' . $highestColumnSheet3 .'1',NULL,TRUE,FALSE);
			$sheet3Header[0]['0'] = 'Phase';
			$sheet3Header[0]['1'] = 'Function';
			$sheet3Header[0]['2'] = 'Title';
			for ($row = 2; $row <= $highestRowSheet3; $row++){ 
				$sheet3Row = $sheet3->rangeToArray('A' . $row . ':' . $highestColumnSheet3 . $row,NULL,TRUE,FALSE);
				if($sheet3Row[0][0]){
					$processLevel1 = array_combine($sheet3Header[0], $sheet3Row[0]);
					$data['ProcessLevel1'][] = $processLevel1;
				}
				
			}
			
			$sheet4     		 = $objPHPExcel->getSheet(3); // Process Decomposition
			$highestRowSheet4    = $sheet4->getHighestRow(); 
			$highestColumnSheet4 = $sheet4->getHighestColumn();

			$sheet4Header = $sheet4->rangeToArray('A1' . ':' . $highestColumnSheet4 .'1',NULL,TRUE,FALSE);
			$sheet4Header[0]['0'] = 'NodeId';
			$sheet4Header[0]['1'] = 'L1ActivityTitle';
			$sheet4Header[0]['2'] = 'L2ActivityTitle';
			$sheet4Header[0]['3'] = 'L3ActivityTitle';
			$sheet4Header[0]['4'] = 'L4ActivityTitle';
			$sheet4Header[0]['5'] = 'L5ActivityTitle';
			for ($row = 2; $row <= $highestRowSheet4; $row++){
				$sheet4Row = $sheet4->rangeToArray('A' . $row . ':' . $highestColumnSheet4 . $row,NULL,TRUE,FALSE);
				if($sheet4Row[0]){
					$processDecomposition = array_combine($sheet4Header[0], $sheet4Row[0]);
					//$resultPD = array_filter( $processDecomposition, 'strlen' );
					$resultPD = $processDecomposition;
					$data['ProcessDecomposition'][] = $resultPD;
				}	
			}
			return $data;
		}catch(\Exception $e){
			die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
		}
	}
	public function readCMProjectXLSJsonRoot($inputFileName = ''){
		try {
			$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
			$objReader 	   = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel   = $objReader->load($inputFileName);

			//  Get worksheet dimensions
			$sheet1     		 = $objPHPExcel->getSheet(0); // CapabilityModelingProjects
			$highestRowSheet1    = $sheet1->getHighestRow(); 
			$highestColumnSheet1 = $sheet1->getHighestColumn(); 	

			$sheet1Header = $sheet1->rangeToArray('A1'. ':' . $highestColumnSheet1 . '1',NULL,TRUE,FALSE);

			$data = [];
			//  Loop through each row of the worksheet in turn
			for ($row = 2; $row <= $highestRowSheet1; $row++){ 
			    //  Read a row of data into an array
			    $sheet1Row = $sheet1->rangeToArray('A' . $row . ':' . $highestColumnSheet1 . $row,NULL,TRUE,FALSE);

			    $capabilityModelingProjects = array_combine($sheet1Header[0], $sheet1Row[0]);
			    $data['CapabilityModelingProjects'][] = $capabilityModelingProjects;
			}
			$sheet2     		 = $objPHPExcel->getSheet(1); // Scoring Criteria
			$highestRowSheet2    = $sheet2->getHighestRow(); 
			$highestColumnSheet2 = $sheet2->getHighestColumn();

			$sheet2Header = $sheet2->rangeToArray('A1' . ':' . $highestColumnSheet2 .'1',NULL,TRUE,FALSE);

			for ($row = 2; $row <= $highestRowSheet2; $row++){ 	
				$sheet2Row = $sheet2->rangeToArray('A' . $row . ':' . $highestColumnSheet2 . $row,NULL,TRUE,FALSE);
				if($sheet2Row[0][0]){
					$scoringCriteria = array_combine($sheet2Header[0], $sheet2Row[0]);
					
					$resultSC = $scoringCriteria;
					$data['ScoringCriteria'][$sheet2Row[0][0]][] = $resultSC;
				}
				
			}
			$sheet3     		 = $objPHPExcel->getSheet(2); // Process Level 1
			$highestRowSheet3    = $sheet3->getHighestRow(); 
			$highestColumnSheet3 = $sheet3->getHighestColumn();
			
			$sheet3Header = $sheet3->rangeToArray('A1' . ':' . $highestColumnSheet3 .'1',NULL,TRUE,FALSE);
			
			$sheet3Header[0]['0'] = 'ProcessLevel1Id';
			$sheet3Header[0]['1'] = 'Phase';
			$sheet3Header[0]['2'] = 'Function';
			$sheet3Header[0]['3'] = 'Title';
			for ($row = 2; $row <= $highestRowSheet3; $row++){ 
				$sheet3Row = $sheet3->rangeToArray('A' . $row . ':' . $highestColumnSheet3 . $row,NULL,TRUE,FALSE);
				if($sheet3Row[0][0]){
					$processLevel1 = array_combine($sheet3Header[0], $sheet3Row[0]);
					$data['ProcessLevel1'][$sheet3Row[0][0]][] = $processLevel1;
				}
				
			}
			$sheet4     		 = $objPHPExcel->getSheet(3); // Process Decomposition
			$highestRowSheet4    = $sheet4->getHighestRow(); 
			$highestColumnSheet4 = $sheet4->getHighestColumn();

			$sheet4Header = $sheet4->rangeToArray('A1' . ':' . $highestColumnSheet4 .'1',NULL,TRUE,FALSE);
			$sheet4Header[0]['0'] = 'ProcessLevel1Id';
			$sheet4Header[0]['1'] = 'NodeId';
			$sheet4Header[0]['2'] = 'L1ActivityTitle';
			$sheet4Header[0]['3'] = 'L2ActivityTitle';
			$sheet4Header[0]['4'] = 'L3ActivityTitle';
			$sheet4Header[0]['5'] = 'L4ActivityTitle';
			$sheet4Header[0]['6'] = 'L5ActivityTitle';
			for ($row = 2; $row <= $highestRowSheet4; $row++){
				$sheet4Row = $sheet4->rangeToArray('A' . $row . ':' . $highestColumnSheet4 . $row,NULL,TRUE,FALSE);

				if($sheet4Row[0]){
					
					$processDecomposition = array_combine($sheet4Header[0], $sheet4Row[0]);
					$resultPD = $processDecomposition;
					$data['ProcessDecomposition'][$sheet4Row[0][0]][] = $resultPD;
				}	
			}
			return $data;
		}catch(\Exception $e){
			die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
		}
	}
	public function readKpiXLSJsonRootOld_18_05_2020($inputFileName = ''){
		try {
			$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
			$objReader 	   = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel   = $objReader->load($inputFileName);
			
			//  Get worksheet dimensions
			$sheet1     		 = $objPHPExcel->getSheet(0); // KPI
			$highestRowSheet1    = $sheet1->getHighestRow(); 
			$highestColumnSheet1 = $sheet1->getHighestColumn(); 	

			$sheet1Header = $sheet1->rangeToArray('A1'. ':' . $highestColumnSheet1 . '1',NULL,TRUE,FALSE);

			$data = [];
			// Loop through each row of the worksheet in turn
			for ($row = 2; $row <= $highestRowSheet1; $row++){ 
			    //  Read a row of data into an array
			    $sheet1Row = $sheet1->rangeToArray('A' . $row . ':' . $highestColumnSheet1 . $row,NULL,TRUE,FALSE);

			    $kpiData = array_combine($sheet1Header[0], $sheet1Row[0]);
			    $data['kpiData'][] = $kpiData;
			}
			$sheet2     		 = $objPHPExcel->getSheet(1); // KPI Audit
			$highestRowSheet2    = $sheet2->getHighestRow(); 
			$highestColumnSheet2 = $sheet2->getHighestColumn();

			$sheet2Header = $sheet2->rangeToArray('A1' . ':' . $highestColumnSheet2 .'1',NULL,TRUE,FALSE);
			if($highestRowSheet2 >=2){
				for ($row = 2; $row <= $highestRowSheet2; $row++){ 
				    //  Read a row of data into an array
				    $sheet2Row = $sheet2->rangeToArray('A' . $row . ':' . $highestColumnSheet2 . $row,NULL,TRUE,FALSE);

				    $kpiAuditData = array_combine($sheet2Header[0], $sheet2Row[0]);
				    $data['kpiAuditData'][] = $kpiAuditData;  
				}
			}else{
				$data['kpiAuditData'] = []; 
			}
			return $data;
		}catch(\Exception $e){
			die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
		}
	}
	public function readKpiXLSJsonRoot($inputFileName = ''){
		try {
			$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
			$objReader 	   = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel   = $objReader->load($inputFileName);
			
			//  Get worksheet dimensions
			$sheet1     		 = $objPHPExcel->getSheet(0); // KPI
			$highestRowSheet1    = $sheet1->getHighestRow(); 
			$highestColumnSheet1 = $sheet1->getHighestColumn(); 	

			$sheet1Header = $sheet1->rangeToArray('A1'. ':' . $highestColumnSheet1 . '1',NULL,TRUE,FALSE);

			$data = [];
			// Loop through each row of the worksheet in turn
			for ($row = 2; $row <= $highestRowSheet1; $row++){ 
			    //  Read a row of data into an array
			    $sheet1Row = $sheet1->rangeToArray('A' . $row . ':' . $highestColumnSheet1 . $row,NULL,TRUE,FALSE);

			    $kpiData = array_combine($sheet1Header[0], $sheet1Row[0]);
			    foreach($kpiData as $key=>$val){
			    	if($key==""){
			    		unset($kpiData[$key]);
			    	}
			    }
			    $data['kpiData'][] = $kpiData;
			}
			
			return $data;
		}catch(\Exception $e){
			die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
		}
	}
	public function readKpiAuditXLSJsonRoot($inputFileName = ''){
		try {
			$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
			$objReader 	   = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel   = $objReader->load($inputFileName);
			
			//  Get worksheet dimensions
			$data = [];
			
			$sheet1     		 = $objPHPExcel->getSheet(0); // KPI Audit
			$highestRowSheet1    = $sheet1->getHighestRow(); 
			$highestColumnSheet1 = $sheet1->getHighestColumn();

			$sheet1Header = $sheet1->rangeToArray('A1' . ':' . $highestColumnSheet1 .'1',NULL,TRUE,FALSE);
			if($highestRowSheet1 >=2){
				for ($row = 2; $row <= $highestRowSheet1; $row++){ 
				    //  Read a row of data into an array
				    $sheet1Row = $sheet1->rangeToArray('A' . $row . ':' . $highestColumnSheet1 . $row,NULL,TRUE,FALSE);

				    $kpiAuditData = array_combine($sheet1Header[0], $sheet1Row[0]);
				    $data['kpiAuditData'][] = $kpiAuditData;  
				}
			}else{
				$data['kpiAuditData'] = []; 
			}
			return $data;
		}catch(\Exception $e){
			die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
		}
	}
	public function readXLSJsonRoot04_05_2020($inputFileName = ''){
		try {
			$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
			$objReader 	   = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel   = $objReader->load($inputFileName);
			
			//  Get worksheet dimensions
			$sheet1     		 = $objPHPExcel->getSheet(0); // CapabilityModelingProjects
			$highestRowSheet1    = $sheet1->getHighestRow(); 
			$highestColumnSheet1 = $sheet1->getHighestColumn(); 	

			$sheet1Header = $sheet1->rangeToArray('A1'. ':' . $highestColumnSheet1 . '1',NULL,TRUE,FALSE);

			$data = [];
			//  Loop through each row of the worksheet in turn
			for ($row = 2; $row <= $highestRowSheet1; $row++){ 
			    //  Read a row of data into an array
			    $sheet1Row = $sheet1->rangeToArray('A' . $row . ':' . $highestColumnSheet1 . $row,NULL,TRUE,FALSE);

			    $capabilityModelingProjects = array_combine($sheet1Header[0], $sheet1Row[0]);
			    $data['CapabilityModelingProjects'][] = $capabilityModelingProjects;
			   
			   
			}
			$sheet2     		 = $objPHPExcel->getSheet(1); // Scoring Criteria
			$highestRowSheet2    = $sheet2->getHighestRow(); 
			$highestColumnSheet2 = $sheet2->getHighestColumn();

			$sheet2Header = $sheet2->rangeToArray('A1' . ':' . $highestColumnSheet2 .'1',NULL,TRUE,FALSE);

			for ($row = 2; $row <= $highestRowSheet2; $row++){ 	
				$sheet2Row = $sheet2->rangeToArray('A' . $row . ':' . $highestColumnSheet2 . $row,NULL,TRUE,FALSE);
				if($sheet2Row[0][0]){
					$scoringCriteria = array_combine($sheet2Header[0], $sheet2Row[0]);
					
					//$resultSC = array_filter( $scoringCriteria, 'strlen' );
					$resultSC = $scoringCriteria;
					unset($resultSC['Scoring Criteria Column']);
					$data['ScoringCriteria'][] = $resultSC;
				}
				
			}
			
			$sheet3     		 = $objPHPExcel->getSheet(2); // Process Level 1
			$highestRowSheet3    = $sheet3->getHighestRow(); 
			$highestColumnSheet3 = $sheet3->getHighestColumn();
			
			$sheet3Header = $sheet3->rangeToArray('A1' . ':' . $highestColumnSheet3 .'1',NULL,TRUE,FALSE);
			$sheet3Header[0]['0'] = 'Phase';
			$sheet3Header[0]['1'] = 'Function';
			$sheet3Header[0]['2'] = 'Title';
			for ($row = 2; $row <= $highestRowSheet3; $row++){ 
				$sheet3Row = $sheet3->rangeToArray('A' . $row . ':' . $highestColumnSheet3 . $row,NULL,TRUE,FALSE);
				if($sheet3Row[0][0]){
					$processLevel1 = array_combine($sheet3Header[0], $sheet3Row[0]);
					$data['ProcessLevel1'][] = $processLevel1;
				}
				
			}
			
			$sheet4     		 = $objPHPExcel->getSheet(3); // Process Decomposition
			$highestRowSheet4    = $sheet4->getHighestRow(); 
			$highestColumnSheet4 = $sheet4->getHighestColumn();

			$sheet4Header = $sheet4->rangeToArray('A1' . ':' . $highestColumnSheet4 .'1',NULL,TRUE,FALSE);
			$sheet4Header[0]['0'] = 'L1ActivityTitle';
			$sheet4Header[0]['1'] = 'L2ActivityTitle';
			$sheet4Header[0]['2'] = 'L3ActivityTitle';
			$sheet4Header[0]['3'] = 'L4ActivityTitle';
			$sheet4Header[0]['4'] = 'L5ActivityTitle';
			for ($row = 2; $row <= $highestRowSheet4; $row++){
				$sheet4Row = $sheet4->rangeToArray('A' . $row . ':' . $highestColumnSheet4 . $row,NULL,TRUE,FALSE);
				if($sheet4Row[0][0]){
					$processDecomposition = array_combine($sheet4Header[0], $sheet4Row[0]);
					//$resultPD = array_filter( $processDecomposition, 'strlen' );
					$resultPD = $processDecomposition;
					$data['ProcessDecomposition'][] = $resultPD;
				}
				
			}
			
			$sheet5     		 = $objPHPExcel->getSheet(4); // Additional Process Details'
			$highestRowSheet5    = $sheet5->getHighestRow(); 
			$highestColumnSheet5 = $sheet5->getHighestColumn();

			$sheet5Header = $sheet5->rangeToArray('A1' . ':' . $highestColumnSheet5 .'1',NULL,TRUE,FALSE);
			for ($row = 2; $row <= $highestRowSheet5; $row++){
				$sheet5Row = $sheet5->rangeToArray('A' . $row . ':' . $highestColumnSheet5 . $row,NULL,TRUE,FALSE);
				if($sheet5Row[0][0]){
					$additionalProcessDetails = array_combine($sheet5Header[0], $sheet5Row[0]);
					//$resultPD = array_filter( $processDecomposition, 'strlen' );
					$resultAPD = $additionalProcessDetails;
					$data['AdditionalProcessDetails'][] = $resultAPD;
				}
				
			}
			
			$sheet6     		 = $objPHPExcel->getSheet(5); // Pain Points Details'
			$highestRowSheet6    = $sheet6->getHighestRow(); 
			$highestColumnSheet6 = $sheet6->getHighestColumn();

			$sheet6Header = $sheet6->rangeToArray('A1' . ':' . $highestColumnSheet6 .'1',NULL,TRUE,FALSE);

			for ($row = 2; $row <= $highestRowSheet6; $row++){
				$sheet6Row = $sheet6->rangeToArray('A' . $row . ':' . $highestColumnSheet6 . $row,NULL,TRUE,FALSE);
				if($sheet6Row[0][0]){
					$paintPointDetails = array_combine($sheet6Header[0], $sheet6Row[0]);
					$resultPPD = $paintPointDetails;
					$data['PaintPointDetails'][] = $resultPPD;
				}
			}
			return $data;
		}catch(\Exception $e){
			die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
		}
	}
	public function readQBXLSJsonRoot($inputFileName = ''){
    	try {
			$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
			$objReader 	   = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel   = $objReader->load($inputFileName);
			
			//  Get worksheet dimensions
			$sheet1     		 = $objPHPExcel->getSheet(0); // Question Bank
			$highestRowSheet1    = $sheet1->getHighestRow(); 
			$highestColumnSheet1 = $sheet1->getHighestColumn(); 	

			$sheet1Header = $sheet1->rangeToArray('A1'. ':' . $highestColumnSheet1 . '1',NULL,TRUE,FALSE);
			$data = [];
			//  Loop through each row of the worksheet in turn
			for ($row = 2; $row <= $highestRowSheet1; $row++){ 
			    //  Read a row of data into an array
			    $sheet1Row = $sheet1->rangeToArray('A' . $row . ':' . $highestColumnSheet1 . $row,NULL,TRUE,FALSE);

			    $sheet1RowData = array_combine($sheet1Header[0], $sheet1Row[0]);
			    $sheet1RowData = array_filter( $sheet1RowData, 'strlen' );
			    $data['QuestionBank'][] = $sheet1RowData;
			}
			$sheet2     		 = $objPHPExcel->getSheet(1); // Scoring Criteria
			$highestRowSheet2    = $sheet2->getHighestRow(); 
			$highestColumnSheet2 = $sheet2->getHighestColumn();

			$sheet2Header = $sheet2->rangeToArray('A1' . ':' . $highestColumnSheet2 .'1',NULL,TRUE,TRUE);
			for ($row = 2; $row <= $highestRowSheet2; $row++){ 	
				$sheet2Row = $sheet2->rangeToArray('A' . $row . ':' . $highestColumnSheet2 . $row,NULL,TRUE,TRUE);
				
				$sheet2RowData = array_combine($sheet2Header[0],  $sheet2Row[0]);
				$sheet2RowData = array_filter( $sheet2RowData, 'strlen' );
				foreach($sheet2RowData as $key=>$val){
					if($key==""){
						unset($sheet2RowData[$key]);
					}

				}
				$data['Options'][$row] = $sheet2RowData;
			}
			/*$image_array = array();
			$i=0;
			foreach($sheet2->getDrawingCollection() as $drawing){
				$string = $drawing->getCoordinates();
				$coordinate = PHPExcel_Cell::coordinateFromString($string);
				
				if ($drawing instanceof PHPExcel_Worksheet_MemoryDrawing){
					ob_start();
					call_user_func($drawing->getRenderingFunction(),$drawing->getImageResource());
					$imageContents = ob_get_contents();
					ob_end_clean();
					switch ($drawing->getMimeType()){
						case PHPExcel_Worksheet_MemoryDrawing::MIMETYPE_PNG :
							$extension = 'png';
						break;
						case PHPExcel_Worksheet_MemoryDrawing::MIMETYPE_GIF:
							$extension = 'gif';
						break;
						case PHPExcel_Worksheet_MemoryDrawing::MIMETYPE_JPEG :
							$extension = 'jpg';
						break;
					}
				}else {
					$zipReader = fopen($drawing->getPath(),'r');
					$imageContents = '';
					while (!feof($zipReader)) {
						$imageContents .= fread($zipReader,1024);
					}
					fclose($zipReader);
					$extension = $drawing->getExtension();
				}
				$image_name = 'image_'.$i.'.'.$extension;
				$destinationPath        = public_path('/QuestionsBank/'.$image_name);
				file_put_contents($destinationPath,$imageContents);
				$image_array[$coordinate[1]]['Path'] = env('APP_URL').'public/QuestionsBank/'.$image_name;
				$i++;
			}
			foreach ($image_array as $key => $value) {
				$data['Options'][$key]['Image'] = $value['Path'];
			}*/

			if(isset($data['Options'])){
				$data['Options'] = array_values($data['Options']);
			}
			foreach ($data['Options'] as $key => $value) {
				if(count($value)==0){
					unset($data['Options'][$key]);
				}
			}
			return $data;
		}catch(\Exception $e){
			die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
		}
    }
    public function cryptoJsAesEncrypt($passphrase, $value){
	    $salt = openssl_random_pseudo_bytes(8);
	    $salted = '';
	    $dx = '';
	    while (strlen($salted) < 48) {
	        $dx = md5($dx.$passphrase.$salt, true);
	        $salted .= $dx;
	    }
	    $key = substr($salted, 0, 32);
	    $iv  = substr($salted, 32,16);
	    $encrypted_data = openssl_encrypt(json_encode($value), 'aes-256-cbc', $key, true, $iv);
	    $data = array("ct" => base64_encode($encrypted_data), "iv" => bin2hex($iv), "s" => bin2hex($salt));
	    //return json_encode($data);
	    return $data;
	}
	public function cryptoJsAesDecrypt($passphrase, $jsonString){
	    //$jsondata = json_decode($jsonString, true);
	    $jsondata = $jsonString;
	    $salt = hex2bin($jsondata["s"]);
	    $ct = base64_decode($jsondata["ct"]);
	    $iv  = hex2bin($jsondata["iv"]);
	    $concatedPassphrase = $passphrase.$salt;
	    $md5 = array();
	    $md5[0] = md5($concatedPassphrase, true);
	    $result = $md5[0];
	    for ($i = 1; $i < 3; $i++) {
	        $md5[$i] = md5($md5[$i - 1].$concatedPassphrase, true);
	        $result .= $md5[$i];
	    }
	    $key = substr($result, 0, 32);
	    $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
	    return json_decode($data, true);
	}
	public function readAmploCMTemplateXLS($inputFileName = ''){
		try {
			$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
			$objReader 	   = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel   = $objReader->load($inputFileName);

			//  Get worksheet dimensions
			$sheet1     		 = $objPHPExcel->getSheet(0); // Template
			$highestRowSheet1    = $sheet1->getHighestRow(); 
			$highestColumnSheet1 = $sheet1->getHighestColumn(); 	

			$sheet1Header = $sheet1->rangeToArray('A1'. ':' . $highestColumnSheet1 . '1',NULL,TRUE,FALSE);

			$data = [];
			// Loop through each row of the worksheet in turn
			for ($row = 2; $row <= $highestRowSheet1; $row++){ 
			    //  Read a row of data into an array
			    $sheet1Row = $sheet1->rangeToArray('A' . $row . ':' . $highestColumnSheet1 . $row,NULL,TRUE,FALSE);

			    $templateData = array_combine($sheet1Header[0], $sheet1Row[0]);
			    $data['templateData'][] = $templateData;
			}
			$sheet2     		 = $objPHPExcel->getSheet(1); // FPM Data
			$highestRowSheet2    = $sheet2->getHighestRow(); 
			$highestColumnSheet2 = $sheet2->getHighestColumn();

			$sheet2Header = $sheet2->rangeToArray('A1' . ':' . $highestColumnSheet2 .'1',NULL,TRUE,FALSE);
			for ($row = 2; $row <= $highestRowSheet2; $row++){ 	
				$sheet2Row = $sheet2->rangeToArray('A' . $row . ':' . $highestColumnSheet2 . $row,NULL,TRUE,FALSE);
				if($sheet2Row[0][0]){
					$fpmData = array_combine($sheet2Header[0], $sheet2Row[0]);
					
					$resultFPM = $fpmData;
					$data['fpmData'][] = $resultFPM;
				}
				
			}

			$sheet3     		 = $objPHPExcel->getSheet(2); // Process Data
			$highestRowSheet3    = $sheet3->getHighestRow(); 
			$highestColumnSheet3 = $sheet3->getHighestColumn();
			
			$sheet3Header = $sheet3->rangeToArray('A1' . ':' . $highestColumnSheet3 .'1',NULL,TRUE,FALSE);

			for ($row = 2; $row <= $highestRowSheet3; $row++){ 	
				$sheet3Row = $sheet3->rangeToArray('A' . $row . ':' . $highestColumnSheet3 . $row,NULL,TRUE,FALSE);
				if($sheet3Row[0][0]){
					$processData = array_combine($sheet3Header[0], $sheet3Row[0]);
					
					$resultProcess = $processData;
					$data['processData'][] = $resultProcess;
				}
				
			}
			return $data;
		}catch(\Exception $e){
			die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
		}
	}

	/*
     Author : Kapil
     Date   : 09-10-2020
     Purpose: to create the json of the excel file
     */
	public function readXLSEBIDTA($inputFileName = ''){
		try {
			$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
			$objReader 	   = PHPExcel_IOFactory::createReader($inputFileType);
			$objPHPExcel   = $objReader->load($inputFileName);
			
			//  Get worksheet dimensions
			$sheet1     		 = $objPHPExcel->getSheet(0); // KPI
			$highestRowSheet1    = $sheet1->getHighestRow(); 
			$highestColumnSheet1 = $sheet1->getHighestColumn(); 
			

			$sheet1Header = $sheet1->rangeToArray('A1'. ':' . $highestColumnSheet1 . '1',NULL,TRUE,FALSE);
			$data = [];
			// Loop through each row of the worksheet in turn
			for ($row = 2; $row <= $highestRowSheet1; $row++){ 
			    //  Read a row of data into an array
			    // $sheet1Row = $sheet1->rangeToArray('A' . $row . ':' . $highestColumnSheet1 . $row,NULL,TRUE,FALSE);
				// $ebiData = array_combine($sheet1Header[0], $sheet1Row[0]);
				
				$ebiData['Month'] 			=  date('M-Y', PHPExcel_Shared_Date::ExcelToPHP($sheet1->getCell('A'.$row)->getValue()));
				$ebiData['Sales'] 			=  (int)$sheet1->getCell('B'.$row)->getCalculatedValue();
				$ebiData['CostofSales'] 	=  (int)$sheet1->getCell('C'.$row)->getCalculatedValue();
				$ebiData['RnDExpense'] 		=  (int)$sheet1->getCell('D'.$row)->getCalculatedValue();
				$ebiData['SGnAExpense']		=  (int)$sheet1->getCell('E'.$row)->getCalculatedValue();
				$ebiData['Depreciation'] 	=  (int)$sheet1->getCell('F'.$row)->getCalculatedValue();
				$ebiData['OtherIncomeExpense'] =  (int)$sheet1->getCell('G'.$row)->getCalculatedValue();
				$ebiData['EBITDA'] 			=  (int)$sheet1->getCell('H'.$row)->getCalculatedValue();

				$tmp =  PHPExcel_Style_NumberFormat::toFormattedString($sheet1->getCell('I'.$row)->getCalculatedValue(), 
				PHPExcel_Style_NumberFormat::FORMAT_PERCENTAGE);
				
				$ebiData['EBITDAMargin'] = (int)str_replace('%','',$tmp);
				
				$data['EBIDTA'][] = $ebiData;
			}
			return $data;
		}catch(\Exception $e){
			die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
		}
	}
	
}
