import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Slider,
    Typography,
    Button,
    Paper,
    Grid,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    TextField,
    Container,
    Input,
    Hidden
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Graph from './Graph'
import HomeIcon from '@material-ui/icons/Home';
import PrintIcon from '@material-ui/icons/Print';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Image from 'material-ui-image';
import AreaPic from '../././image/Area.jpg';
import RegionPic from '../././image/Area.jpg';
import TrafficOneDirectionPic from '../././image/TotalDesign Traffic.png';
import StructureDesignCriteriaPic from '../././image/StructureDesignCriteria.png';
import AcceptableNumberofPunchoutPic from '../././image/AcceptableNumberofPunchout.png';
import ConcreteLayerPic from '../././image/ConcreteLayer.png';
import soilSystermPic from '../././image/soilSystermPic.png';
import subbasePic from '../././image/subbase.png';
import BasetypePic from '../././image/BasetypePic.png';
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import Report from "./report";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import * as d3 from "d3";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import XLSX from 'xlsx';
import excelFile from './data/KICT Design Program Working File_v20211013.xlsm'


import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider/Divider";
import Region from "./County";
import ComtrolwithSlider from "./ControlwithSlider";

const regions = {
    "I": ['고산', '성산', '서귀포', '제주', '흑산도', '진도군', '완도', '여수', '울릉도', '통영', '보성군', '거제', '목포', '고흥', '광양시', '북창원', '남해', '장흥'],
    "II": ['부산', '강진군', '양산시', '백령도', '김해시', '광주', '동해', '순천', '보령', '해남', '창원', '울진', '군산', '포항', '울산', '산청', '영광군', '경주시', '대구', '의령군', '구미', '북강릉', '고창군', '진주', '정읍', '고창', '홍성', '함양군', '강릉', '추풍령', '전주', '상주', '순창군', '해주', '밀양', '영덕', '용연', '속초', '인천', '부안', '장전', '영천', '문경', '거창', '서산', '합천', '김책', '남포', '청진', '대전', '원산', '사리원', '청주', '남원', '개성', '태백', '평양', '수원', '강화', '선봉', '청송군', '서울', '안주', '신의주', '부여', '영주', '함흥', '신포', '안동', '임실', '정선군', '장수', '원주', '신계'],
    "III": ['보은', '금산', '천안', '충주', '대관령', '양평', '파주', '북춘천', '인제', '수풍', '이천', '영월', '희천', '의성', '평강', '춘천', '구성', '동두천', '제천', '봉화', '풍산', '양덕', '철원', '홍천', '강계', '장진', '삼지연', '중강', '혜산'],
};
const region2Number = {'I':1,'II':2,'III':3};
const counties = {};
Object.keys(regions).forEach(key => {
    regions[key].forEach(c => counties[c] ? counties[c].push(key) : counties[c] = [key])
});
const highway = ["IH 45", "US 290", "IH 30", "US 59", "IH 35W", "IH 820", "IH 10", "IH 40", "IH 35", "US 287", "US 81", "IH 27", "SL 289", "SH 226", "SH 36", "US 83B", "VA", "FM 3129", "IH 20", "US 71", "US 79", "US 47", "US 67", "BU90-Y", "CS", "FM 1960", "FM 364", "FM 365", "SH 347", "SH 105", "SH 12", "SH 124", "SH 146", "SH 326", "SH 61", "SH 73", "SH 87", "SS 380", "US 90", "US 69", "US 96", "BS6-R", "SH 21", "BW 8", "US 83", "BS 121H", "FM 1171", "FM 1382", "FM 2499", "FM 709", "FM 740", "IH 35E", "IH4 5", "IH 635", "LP 12", "LP 354", "MH", "SH 289", "SH 31", "SH 66", "SH 78", "SH 114", "SH 121", "SH 161", "SH 180", "SH 183", "SH 310", "SH 34", "SH 342", "SH 356", "SL 12", "SL 288", "SP 244", "SP 348", "SP 366", "SPUR 354", "US 175", "US 380", "US 75", "US 77", "US 377", "US 80", "US 54", "BU 287P", "FM 157", "IH 820 ", "SH 199", "SH 26", "SH 360", "FM 1764", "FM 523", "FM 1092", "FM 1488", "FM 518", "IH 610", "SH 288", "SH 332", "SH 225", "SH 242", "SH 249", "SH 35", "US 90A", "IH27", "SH 7", "FM 1472", "LP 20", "ODA 181-1", "ODA 181-2", "ODA 250-1", "ODA 250-2", "US 82", "SH 6", "FM 85", "LP 281", "LP 323", "SH 19", "SH 198", "SH 334", "US 259", "US 281", "FM 1695", "FM 3476", "FM 933", "IH 36", "LP 363", "SH 195", "US 84", "BU 287J", "IH 44", "SH 240", "SP 1027 ", "US 287 ", "US 55", "US 70", "SH 71"];
// const baseType = ["CTB", "HMA Base"];
const soilClassSub = ["GW","GP","GM","GC","SW","SP","SM","SC","ML","CL","OL","MH","CH","OH"];

const styles = theme => ({
    root: {
        width: '100%',
        '& .MuiTextField-root': {
            width: '100%',
        },
        '& input': {
            width: '100%',
        },
        '& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button':{
            opacity: 1
        }
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    dot: {
        borderBottom: '2px dotted',
        marginBottom: '4px'
    },
    helpHolder: {
        padding: theme.spacing(1),
    },
    inputWithHelper: {
        '& label': {
            pointerEvents: 'all'
        }
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        zIndex:2
    },
    hideArrow:{
        '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        }
    },
    Info: {
        pointerEvents: 'all'
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            {children}
            {onClose ? (
                <IconButton aria-label="close" size="small" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
const init = {
    activeStep: 0,
    stepsLength: 3,
    finished: false,
    DesignLife: 20,
    PunchoutsPerMile: 6,
    LanesOneDirection: 2,
    TrafficOneDirection: 60,
    ModulusOfRupture: 4.5,
    SlabThickness: 25,
    ElasticModulue: 5,
    SoilClassificationSystem:'USCS',
    SoilSub:"CH",
    PlasticityIndex:8,
    SubbaseType:"LTS",
    SubbaseThickness:12,
    BaseType:'',
    BaseThickness: 15,
    BaseThicknessMin: 10,
    BaseThicknessMax: 20,
    ModulusBase : 15000,
    CompositeK: 539,
    Area: null,
    Region: null,
    Highway: null,
    StationBegin: null,
    StationEnd: null,
    currentAreas: Object.keys(counties),
    currentRegions: Object.keys(regions),
    SubbaseThicknessThreshHold:-1,
    SubbaseTypeOpt:['Cement treated subgrade',
        'Lime treated subgrade',
        'Lime-cement treated subgrade',
        'Lime-fly ash treated subgrade',
        'Fly ash treated subgrade',
        'N/A'
    ],
    baseTypeOpt:["CTB", "HMA Base"],
    ksTable:new Map(),
    ssTable:[],
    temperature:[],
}
class CRCP extends Component {
    constructor(props) {
        super(props);
        this.state = {...init};
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevState.ModulusBase!==this.state.ModulusBase)||(prevState.SoilSub!==this.state.SoilSub)||(prevState.BaseThickness!==this.state.BaseThickness)){
            this.calculateCompositeK();
        }
    }

    componentDidMount() {
        fetch(excelFile).then(res => res.arrayBuffer()).then(ab => {
            const wb = XLSX.read(ab, {type: "array"});

            const temperatureSheet = wb.Sheets['Temperature'];
            init.temperature = XLSX.utils.sheet_to_json(temperatureSheet);

            const sTableSheet = wb.Sheets['S-Table'];
            init.ssTable = XLSX.utils.sheet_to_json(sTableSheet);

            this.setState({temperature:init.temperature,ssTable:init.ssTable})
        })
        this.handlePlasticityIndex(this.state.PlasticityIndex);
        this.calculateCompositeK();
    }
    computeStress = (SlabThickness)=>{ // F7
        let input = {
            Region: {Input: region2Number[this.state.Region]},
            H1: {Input:SlabThickness,"L Bound":0, "H Bound":0},
            K: {Input:this.state.CompositeK,"L Bound":0, "H Bound":0},
            'MR Des': {Input:5},
            'ESALs': {Input:this.state.TrafficOneDirection},
            'FD': {Input:48},
            'PO': {Input:0},
            'STR': {Input:0},
            'MR Inp': {Input:this.state.ModulusOfRupture,"L Bound":0},
        }

        let B3 = input.H1.Input;
        input.H1["L Bound"] = (B3>25)?25:((B3>30)?30:35);
        input.H1["H Bound"] = (B3<=25)?25:((B3<=30)?30:35);
        let B4 = input.K.Input;
        input.K["L Bound"] = (B4>1000)?1000:((B4>500)?500:100);
        input.K["H Bound"] = (B4<=100)?100:((B4<=500)?500:1000);
        let B7 = input.FD.Input;
        input.PO.Input = Math.round(29.379/(1+(603*(Math.pow(B7,-1.3054)))),0);
        let B5 = input['MR Des'].Input;
        let B6 = input['ESALs'].Input;
        input.STR.Input = Math.round((B5/(Math.pow(B6/48/225000,0.25)))*100)/100;
        let B10 = input['MR Inp'].Input;
        input['MR Inp']['L Bound'] = -2*B10+10;


        let data2 = [];
        const Region = input.Region.Input;
        const mapSSTable = {}
        this.state.ssTable.forEach(s=>{
            const A2 = s["Region"];
            const B2 = +s["Thickness of Existing Concrete"];
            const C2 = +s["Composite K"];
            const D2 = +s["Thickness of CRCP Overlay"];
            const E2 = s["ID"];
            const F2 = +s["max ESALs"];
            const G2 = Math.round((input['MR Des'].Input/Math.pow((F2*1000000/48)/225000,0.25) )*100)/100;// stress
            mapSSTable[E2] = {A2,B2,C2,D2,E2,F2,G2};
        });

        const I = [10,15,20];
        const H = [input.K['L Bound'],input.K['H Bound']];
        [input.H1['L Bound'],input.H1['H Bound']].forEach(H1=>{
            H.forEach(Comp_K=>{
                I.forEach(H2=>{
                    const ID =  `${Region}${H1}${Comp_K}${H2}`;
                    const ESALs = mapSSTable[ID].F2;
                    const STR = mapSSTable[ID].G2;
                    data2.push({Comp_K,ESALs,STR});
                })
            })
        });

        const jump = H.length*I.length;
        const jump2 = I.length;
        let data3 = [];
        [input.H1['L Bound'],input.H1['H Bound']].forEach((H1,j)=>{
            [input.K.Input].forEach(Comp_K=>{
                I.forEach((_H2,i)=>{
                    const K2 = data2[j*jump + i].ESALs;
                    const K5 = data2[j*jump + jump2 + i].ESALs;
                    const H2 = data2[j*jump + i].Comp_K;
                    const H5 = data2[j*jump + jump2 + i].Comp_K;
                    const L2 = data2[j*jump + i].STR;
                    const L5 = data2[j*jump + jump2 + i].STR;
                    const Q2 = Comp_K;
                    const ESALs =((K2-K5)*Q2+(K5*H2-H5*K2))/(H2-H5);
                    const STR = ((L2-L5)*Q2+(L5*H2-H5*L2))/(H2-H5);
                    data3.push({Comp_K,H1,ESALs,STR});
                })
            })
        });
        let data4 = [];
        [input.H1.Input].forEach((H1)=>{
            [input.K.Input].forEach(Comp_K=>{
                I.forEach((H2,i)=>{
                    const S2 = data3[i].ESALs;
                    const S8 = data3[jump2 + i].ESALs;
                    const P2 = data3[i].H1;
                    const P8 = data3[jump2 + i].H1;
                    const T2 = data3[i].STR;
                    const T8 = data3[jump2 + i].STR;
                    const X2 = H1;
                    const ESALs =Math.round(((S2-S8)*X2+(S8*P2-P8*S2))/(P2-P8))//((S2-S8)*X2+(S8*P2-P8*S2))/(P2-P8);
                    const STR = ((T2-T8)*X2+(T8*P2-P8*T2))/(P2-P8);
                    const ID = `${Region}${H1}${Comp_K}${ESALs}`;
                    const LN = Math.log(ESALs);
                    data4.push({Comp_K,ESALs,H2,STR,ID,LN});
                })
            })
        });
        function linearRegression(y,x){
            var lr = {}; var n = y.length; var sum_x = 0; var sum_y = 0; var sum_xy = 0; var sum_xx = 0; var sum_yy = 0;

            for (var i = 0; i < y.length; i++) {
                sum_x += x[i];
                sum_y += y[i];
                sum_xy += (x[i]*y[i]);
                sum_xx += (x[i]*x[i]);
                sum_yy += (y[i]*y[i]);
            }

            lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
            lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
            lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

            return lr;
        }
        let lr = linearRegression(data4.map(d=>d.LN),data4.map(d=>d.H2));
        const W19 = lr.slope;
        const X19 = lr.intercept;
        let data5 = {Region,H1:input.H1.Input,Comp_K:input.K.Input,'Input_ESALs':input.ESALs.Input,'Input_STR':input.STR.Input};
        data5.ID = `${data5.Region}${data5.H1}${data5.Comp_K}${data5.Input_ESALs}`;

        const _lookup = data4.find(d=>d.ID===data5.ID);
        data5.H2 = Math.round(((_lookup??{H2:((Math.log(data5['Input_ESALs']))-X19)/W19}).H2+input['MR Inp']['L Bound'])*10)/10;
        // console.log(input,data2,data3,data4,data5)
        return data5.H2;
    }
    recompute = ()=>{
        // let __ret = {};
        // let i = 25;
        // for (i=25;i<=35;i++) {
        //     __ret = this.analysis(i);
        //     console.log(__ret.rows[__ret.r][12])
        //     if(__ret.rows[__ret.r][12]<=this.state.PunchoutsPerMile)
        //         break;
        // }
        // let rowIndexStress = __ret.rowIndexStress;
        // let row1 = __ret.row1;
        // const rows = __ret.rows;
        // var r = __ret.r;
        // this.props.AnalysisPunchouts(rows[r][12]);
        // // this.props.AnalysisSlabThickness(Math.min(13,i));
        // this.props.AnalysisSlabThickness(Math.min(i,15));
        // this.setState({row1,rows,rowIndexStress})


        // new
        const AnalysisSlabThickness = this.computeStress(this.state.SlabThickness);
        this.props.AnalysisSlabThickness(AnalysisSlabThickness);
        this.setState({JCPC:this.state.SlabThickness-AnalysisSlabThickness})
    };

    analysis(slabthickness) {
        const data = this.computeStress(slabthickness);

        let rowIndexStress = 8;
        let row1 = [];
        const rows = [];
        row1.push(1);
        row1.push(row1[0] / 12);
        row1.push(this.state.ModulusOfRupture);
        row1.push(57000 / 7.5 * row1[2] / 1000);
        row1.push(+data[rowIndexStress - 2]["STR (T)"]);
        row1.push(data[rowIndexStress - 2]["STR (E)"] * row1[3] / 5000)
        row1.push(row1[4] + row1[5])
        row1.push(row1[6] / row1[2])
        row1.push(11800 * Math.pow(row1[7], fatigue(this.state.CompositeK)))
        row1.push(lane(this.state.LanesOneDirection)
            * this.state.TrafficOneDirection * 1000000 / 12 / this.state.DesignLife)
        row1.push(row1[9] / row1[8])
        row1.push(row1[10])
        row1.push(18.985 / (1 + 5 * Math.pow(row1[11], -1.1)))
        rows.push(row1);    // Add to the array

        //console.log(+document.getElementById("DesignLife").value);
        for (var i = 1; i <= this.state.DesignLife; i++) {
            //debugger;
            if (i !== 1)
                rowIndexStress = 7;
            for (var j = 0; j < 12; j++) {
                if (i == 1 && j == 0)
                    ;
                    //If counterYear = 1 And counterMonth = 1 Then
                //      'If First Year than Omit Calculation of First Month, Already Done
                else {
                    rowIndexStress = rowIndexStress + 1
                    let row2 = [];
                    row2.push(row1[0] + 1)
                    row2.push(row2[0] / 12);
                    // Cells(rowIndex, 2) = Cells(rowIndex, 1).Value / 12
                    row2.push(this.state.ModulusOfRupture
                        * Math.pow((30 * row2[0] / (4 + 0.85 * 30 * row2[0])), 0.5));
                    // Cells(rowIndex, 3) = Sheets("Input").Range("F8").Value * ((30 * Cells(rowIndex, 1).Value / (4 + 0.85 * 30 * Cells(rowIndex, 1).Value))) ^ 0.5
                    row2.push(57000 / 7.5 * row2[2] / 1000);
                    // Cells(rowIndex, 4) = 57000 / 7.5 * Cells(rowIndex, 3) / 1000
                    row2.push(+data[rowIndexStress - 2]["STR (T)"]);
                    // Cells(rowIndex, 5) = Sheets("Stress").Cells(rowIndexStress, 38).Value
                    row2.push(data[rowIndexStress - 2]["STR (E)"] * row2[3] / 5000);
                    // Cells(rowIndex, 6) = Sheets("Stress").Cells(rowIndexStress, 39).Value * Cells(rowIndex, 4) / 5000
                    row2.push(row2[4] + row2[5]);
                    // Cells(rowIndex, 7) = Cells(rowIndex, 5).Value + Cells(rowIndex, 6).Value
                    row2.push(row2[6] / row2[2]);
                    // Cells(rowIndex, 8) = Cells(rowIndex, 7).Value / Cells(rowIndex, 3).Value
                    row2.push(11800 * Math.pow(row2[7], fatigue(this.state.CompositeK)));
                    // Cells(rowIndex, 9) = 11800 * Cells(rowIndex, 8).Value ^ fatigue(Sheets("Input").Range("CompositeK").Value)
                    row2.push(row1[9]);
                    // Cells(rowIndex, 10) = Cells(rowIndex - 1, 10).Value
                    row2.push(row2[9] / row2[8]);
                    // Cells(rowIndex, 11) = Cells(rowIndex, 10).Value / Cells(rowIndex, 9).Value
                    row2.push(row1[11] + row2[10])
                    // Cells(rowIndex, 12) = Cells(rowIndex - 1, 12).Value + Cells(rowIndex, 11).Value
                    row2.push(18.985 / (1 + 5 * Math.pow(row2[11], -1.1)))
                    // Cells(rowIndex, 13) = 18.985 / (1 + 5 * Cells(rowIndex, 12).Value ^ -1.1)
                    if (rowIndexStress == 13)
                        rowIndexStress = 1
                    rows.push(row2);
                    row1 = row2;
                }
            }
        }
        var r = 12 * this.state.DesignLife - 1;
        return {rowIndexStress, row1, rows, r};
        function lane(n) {
            if (n <= 2)
                return 1;
            else if (n >= 4)
                return 0.6;
            else
                return 0.7;
        }

        function fatigue(k) {
            if (k < 200)
                return k * 0.0221 - 15.97;
            else if (k < 300)
                return k * 0.0164 - 14.83;
            else if (k < 500)
                return k * 0.0038 - 11.05;
            else if (k < 1000)
                return k * 0.00033 - 9.31;
            else
                return k * 0.00071 - 9.69;
        }
    }

    errorFunc={
        Step3:{
            'SubbaseThickness': ()=>this.state.SubbaseThickness<this.state.SubbaseThicknessThreshHold?`Must greater than ${this.state.SubbaseThicknessThreshHold}`:(this.state.SubbaseThickness===''?'Required':null),
            'BaseThickness': ()=>(this.state.BaseThickness<this.state.BaseThicknessMin)?`≥ ${this.state.BaseThicknessMin}`:(this.state.BaseThickness===''?'Required':null)
        }
    };

    handleNext = () => {
        this.setState({activeStep: this.state.activeStep + 1});
    };

    handleBack = () => {
        this.setState({activeStep: this.state.activeStep - 1});
    };

    handleModify = () => {
        this.setState({activeStep: 0, finished:false});
    };

    handleReset = () => {
        this.setState({...init});
    };

    onSaveInput = () => {
        let filename = `txDoT_${this.state.Area}_${new Date().toISOString().replace('.','|')}`;
        let saveDataKey = ['DesignLife', 'PunchoutsPerMile', 'LanesOneDirection', 'TrafficOneDirection', 'ModulusOfRupture','SlabThickness',
            'ElasticModulue', 'SoilClassificationSystem', 'SoilSub', 'PlasticityIndex', 'SubbaseType',
            'SubbaseThickness', 'BaseType', 'BaseThickness', 'BaseThicknessMin', 'ModulusBase',
            'CompositeK', 'Area', 'Region', 'Highway', 'StationBegin', 'StationEnd',
            'currentAreas', 'currentRegions', 'SubbaseThicknessThreshHold', 'SubbaseTypeOpt', 'baseTypeOpt'];
        const saveData = {};
        saveDataKey.forEach(k=>saveData[k]=this.state[k]);
        const jsonse = JSON.stringify(saveData);
        let blob = new Blob([jsonse], {type: "application/json"});

        // Specify link url
        let url = URL.createObjectURL(blob);
        // Specify file name
        filename = filename?filename+'.json':'txDot.json';

        // Create download link element
        let downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if(navigator.msSaveOrOpenBlob ){
            navigator.msSaveOrOpenBlob(blob, filename);
        }else{
            // Create a link to the file
            downloadLink.href = url;

            // Setting the file name
            downloadLink.download = filename;

            //triggering the function
            downloadLink.click();
        }

        document.body.removeChild(downloadLink);
    }

    handleOpenHelper = (content,freeze) => (event) => {
        if (this.state.helperEl) {
            if (this.state.helperEl.el === event.currentTarget && freeze && this.state.helperEl.freeze) // same target
                this.handleCloseHelper(event);
            else {
                if (freeze || this.state.helperEl.el !== event.currentTarget && freeze)
                    this.setState({helperEl: {el: event.currentTarget, content, freeze}})
            }
        }else{
            this.setState({helperEl: {el: event.currentTarget, content, freeze}})
        }
    };

    handleCloseHelper = (source) => {
        if(source.type!=='mouseleave' || source.type==='mouseleave'&&this.state.helperEl&& (!this.state.helperEl.freeze))
        this.setState({helperEl: undefined})
    };

    handleBlurSliderInput = (key, min, max) => {
        const value = this.state[key];
        const obj = {};
        if (value < min) {
            obj[key] = min;
            this.setState(obj);
        } else if (value > max) {
            obj[key] = max;
            this.setState(obj);
        }
    }
    handleChangeSliderInput = (event, key) => {
        const obj = {};
        obj[key] = event.target.value === '' ? '' : Number(event.target.value);
        this.setState(obj);
    }
    handleChange = (key, value) => {
        const obj = {};
        obj[key] = value;
        this.setState(obj);
    };
    handleSoilSub = (value)=>{
        let baseTypeOpt = ["CTB", "HMA Base"];
        let BaseType = this.state.BaseType;
        if (this.state.PlasticityIndex>=15){
            if (["ML", "CL", "OL", "MH", "CH", "OH"].indexOf(value)!==-1)
             {   baseTypeOpt = ["CTB"];
                 BaseType = "CTB";
             }
        }
        this.setState({SoilSub:value,baseTypeOpt,BaseType});
    };
    handleBaseType = (value) => {
        // let BaseThicknessMin = 4;
        // let BaseThickness = this.state.BaseThickness;
        // let ModulusBase = 400;
        // if (value==='CTB'){
        //     BaseThicknessMin = 6;
        //     ModulusBase = 500;
        // }
        // if (BaseThickness<BaseThicknessMin)
        //     BaseThickness = BaseThicknessMin;
        // this.setState({BaseType:value,BaseThicknessMin,BaseThickness,ModulusBase});
        this.setState({BaseType:value})
    }
    handlePlasticityIndex = (value)=>{
        let SubbaseTypeOpt = [];
        let SubbaseThicknessThreshHold = -1;
        if (value<15){
            SubbaseTypeOpt = ['Cement treated subgrade','Lime-fly ash treated subgrade','N/A'];
        }else if (value<35){
            SubbaseTypeOpt = ['Cement treated subgrade',
                'Lime treated subgrade',
                'Lime-cement treated subgrade',
                'Lime-fly ash treated subgrade',
                'Fly ash treated subgrade','N/A'];
        }else{
            SubbaseTypeOpt = ['Lime treated subgrade',
                'Lime-cement treated subgrade',
                'Lime-fly ash treated subgrade','N/A'];
            SubbaseThicknessThreshHold = 8;
        }
        this.setState({PlasticityIndex:value,SubbaseTypeOpt,SubbaseThicknessThreshHold});
    };
    calculateCompositeK = ()=>{
        let {ModulusBase,SoilSub,BaseThickness} = this.state;
        ModulusBase = ModulusBase*0.14503773800722// convert
        const E8 = (0.81371*getSubgradeValue(SoilSub)+538.756*Math.round(BaseThickness/2.54)+ 1.05349*getModulusBase(ModulusBase)-2441.9);
        const CompositeK = Math.round((E8/145.03773800722/0.0254>500)?500:((E8/145.03773800722/0.0254<100)?100:(E8/145.03773800722/0.0254)));
        // this.setState({CompositeK: ksTable.get(''+getSubgradeValue(SoilSub)+' '+Math.round(BaseThickness)+' '+getModulusBase(ModulusBase))});
        this.setState({CompositeK});

        function getSubgradeValue(SoilSub){
            switch (SoilSub) {
                case "A-1-a":
                case "A-2-4":
                case "A-2-5":
                case "GW":
                case "GP":
                case "GM":
                case "SM":
                    return 300;
                case "A-1-b":
                case "SW":
                    return 200;
                case "A-3":
                case "A-2-6":
                case "A-2-7":
                case "SP":
                case "GC":
                case "SC":
                    return 150;
                case "A-7-6":
                case "CH":
                case "OH":
                    return 50;
                case "A-4":
                case "A-5":
                case "A-7-5":
                case "ML":
                case "OL":
                case "MH":
                case "CL":
                    return 25;
            }
        }
        function getModulusBase(ModulusBase){
            if (ModulusBase<=100)
                return Math.round(ModulusBase/10)*10;
            else if((ModulusBase>100)&&(ModulusBase<1000)&&((ModulusBase%50) <25))
                return ModulusBase-(ModulusBase%50)
            else if((ModulusBase>100)&&(ModulusBase<1000)&&((ModulusBase%50)>=25))
                return ModulusBase+50-(ModulusBase%50)
            else if(ModulusBase>=1000)
                return Math.round(ModulusBase/100)*100;
            return 0;
        }
    }

    render() {
        const {classes} = this.props;
        const getGroupControl = () => {
            return <div className={classes.actionsContainer}>
                <div>
                    <Button
                        variant="contained"
                        onClick={this.props.toMenu}
                        className={classes.button}
                        startIcon={<HomeIcon/>}
                    >
                        To Main Menu
                    </Button>
                    <Button
                        disabled={this.state.activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                    >
                        Back
                    </Button>
                    <Button
                        disabled={!this.state.Region}
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                    >
                        {this.state.activeStep === this.state.stepsLength - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </div>
        }
        if ((this.state.activeStep === this.state.stepsLength) && !this.state.finished){
            this.setState({finished: true});
            this.recompute();
        }
        return (<Container maxWidth="lg"> <Paper elevation={3}>
            <Grid container>
            <Grid item style={{maxWidth: this.state.finished ? '220px' : '100%'}}>
            <Stepper activeStep={this.state.activeStep} orientation="vertical">
                <Step>
                    <StepLabel>Step 1</StepLabel>
                    <StepContent displayPrint="block">
                        <form className={classes.root} noValidate autoComplete="off">
                            <Grid container spacing={4}>
                                <Grid container item xs={12} spacing={1} justify="center">
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            margin="dense"
                                            variant="filled"
                                            select
                                            id="region"
                                            value={this.state.Region}
                                            size="small"
                                            style={{marginTop: 8, marginBottom: 4}}
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                if (value == null)
                                                    this.setState({
                                                        Region: value,
                                                        currentAreas: Object.keys(counties)
                                                    });
                                                else
                                                    this.setState({
                                                        Region: value,
                                                        currentAreas: regions[value]
                                                    });
                                            }}
                                            required
                                            error={!this.state.Region}
                                            label={<>Region<IconButton
                                                aria-label="info"
                                                className={classes.margin+' '+classes.Info}
                                                size="small">
                                                <InfoIcon fontSize="small"
                                                          onClick={this.handleOpenHelper({src: RegionPic},true)}
                                                          onMouseEnter={this.handleOpenHelper({src: RegionPic})}
                                                          onMouseLeave={this.handleCloseHelper}
                                                /></IconButton></>}
                                        >
                                            {this.state.currentRegions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField dense margin="dense"
                                                   id="area"
                                                   value={this.state.Area}
                                                   className={classes.inputWithHelper}
                                                   onChange={(event) => {
                                                       this.setState({Area: event.target.value})
                                                   }}
                                                   size="small"
                                                   style={{marginTop: 8, marginBottom: 4}}
                                                   label={<>Location</>}
                                                   variant="filled"/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField dense
                                            margin="dense"
                                            id="highway"
                                            options={highway}
                                            value={this.state.Highway}
                                                   label="HIGHWAY"
                                                   variant="filled"
                                            onChange={(event, value) => this.handleChange('Highway', value)}
                                            size="small"
                                            style={{marginTop: 8, marginBottom: 4}}
                                            />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            margin="dense"
                                            id="DirectionOfConstruction"
                                            label="DIRECTION OF CONSTRUCTION"
                                            value={this.state.DirectionOfConstruction}
                                            onChange={(event) => this.handleChange('DirectionOfConstruction', event.target.value)}
                                            variant="filled"/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            margin="dense"
                                            id="StationBegin"
                                            label="STATION (BEGIN)"
                                            value={this.state.StationBegin}
                                            onChange={(event) => this.handleChange('StationBegin', event.target.value)}
                                            variant="filled"/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            margin="dense"
                                            id="StationEnd"
                                            label="STATION (END)"
                                            value={this.state.StationEnd}
                                            onChange={(event) => this.handleChange('StationEnd', event.target.value)}
                                            variant="filled"/>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            margin="dense"
                                            id="date"
                                            type="date"
                                            label="DATE"
                                            value={this.state.Date}
                                            onChange={(event) => this.handleChange('Date', event.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="filled"/>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={1}>
                                    <TextField
                                        id="comment"
                                        label="COMMENTS"
                                        multiline
                                        onChange={(event) => this.handleChange('Comment', event.target.value)}
                                        rows={4}
                                        defaultValue=""
                                        variant="filled"
                                    />
                                </Grid>
                            </Grid>
                        </form>
                        {getGroupControl()}
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Step 2</StepLabel>
                    <StepContent displayPrint="block">
                        <form className={classes.root} noValidate autoComplete="off">
                            <Grid container spacing={4}>
                                <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                    <Grid item xs={12} justify="flex-start">
                                        <Typography variant={'h6'}>Basic Design Information</Typography>
                                    </Grid>
                                    <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                          alignItems="flex-end">
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Design life (years)</span>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3} sm={4} md={3}>
                                            <Slider
                                                value={this.state.DesignLife}
                                                onChange={(event, newValue) => this.setState({DesignLife: newValue})}
                                                defaultValue={30}
                                                min={10} max={30}
                                                id="DesignLife"
                                            />
                                        </Grid>
                                        <Hidden smDown>
                                            <Grid item xs={1}>
                                                <Input
                                                    value={this.state.DesignLife}
                                                    onChange={(event) => this.handleChangeSliderInput(event, 'DesignLife')}
                                                    onBlur={() => this.handleBlurSliderInput('DesignLife', 10, 30)}
                                                    id="DesignLife"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        min: 10,
                                                        max: 30,
                                                        type: 'number',
                                                    }}
                                                />
                                            </Grid>
                                        </Hidden>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Total number of lanes in one direction</span>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3} xm={4} md={3}>
                                            <Slider
                                                value={this.state.LanesOneDirection}
                                                onChange={(event, newValue) => this.setState({LanesOneDirection: newValue})}
                                                defaultValue={2}
                                                min={1} max={10}
                                                id="LanesOneDirection"
                                            />
                                        </Grid>
                                        <Hidden smDown>
                                            <Grid item xs={1}>
                                                <Input
                                                    value={this.state.LanesOneDirection}
                                                    onChange={(event) => this.handleChangeSliderInput(event, 'LanesOneDirection')}
                                                    onBlur={() => this.handleBlurSliderInput('LanesOneDirection', 1, 10)}
                                                    id="LanesOneDirection"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        min: 1,
                                                        max: 10,
                                                        type: 'number',
                                                    }}
                                                />
                                            </Grid>
                                        </Hidden>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Total design traffic in one direction (million ESAL)</span>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3} xm={4} md={3}>
                                            <Slider
                                                value={this.state.TrafficOneDirection}
                                                onChange={(event, newValue) => this.setState({TrafficOneDirection: newValue})}
                                                defaultValue={100}
                                                min={30} max={150}
                                                id="TrafficOneDirection"
                                            />
                                        </Grid>
                                        <Hidden smDown>
                                            <Grid item xs={1}>
                                                <Input
                                                    value={this.state.TrafficOneDirection}
                                                    onChange={(event) => this.handleChangeSliderInput(event, 'TrafficOneDirection')}
                                                    onBlur={() => this.handleBlurSliderInput('TrafficOneDirection', 30, 150)}
                                                    id="TrafficOneDirection"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        min: 30,
                                                        max: 150,
                                                        type: 'number',
                                                    }}
                                                />
                                            </Grid>
                                        </Hidden>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                    <Grid item xs={12} container justify="flex-start">
                                        <Typography variant={'h6'}>Structural Design Criteria</Typography>
                                    </Grid>
                                    <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                          alignItems="flex-end">
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Acceptable punchout per km</span>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={3} xm={4} md={3}>
                                            <Slider
                                                value={this.state.PunchoutsPerMile}
                                                onChange={(event, newValue) => this.setState({PunchoutsPerMile: newValue})}
                                                defaultValue={5}
                                                min={1} max={10}
                                                id="PunchoutsPerMile"
                                                disabled
                                            />
                                        </Grid>
                                        <Hidden smDown>
                                            <Grid item xs={1}>
                                                <Input
                                                    value={this.state.PunchoutsPerMile}
                                                    onChange={(event) => this.handleChangeSliderInput(event, 'PunchoutsPerMile')}
                                                    onBlur={() => this.handleBlurSliderInput('PunchoutsPerMile', 1, 10)}
                                                    id="PunchoutsPerMile"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        min: 1,
                                                        max: 10,
                                                        type: 'number',
                                                    }}
                                                    disabled
                                                />
                                            </Grid>
                                        </Hidden>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                    <Grid item xs={12} container justify="flex-start">
                                        <Typography variant={'h6'}>Concrete Layer/Material Information</Typography>
                                    </Grid>
                                    <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                          alignItems="flex-end">
                                        <ComtrolwithSlider
                                            title={'Existing slab thickness before milling (cm)'}
                                            classes={classes}
                                            value={this.state.SlabThickness}
                                            setValue={(v)=>this.setState({SlabThickness:v})}
                                            min={25}
                                            max={35}
                                        />
                                    </Grid>
                                    <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                          alignItems="flex-end">
                                        <ComtrolwithSlider
                                            title={'28-day modulus of rupture (MPa)'}
                                            classes={classes}
                                            value={this.state.ModulusOfRupture}
                                            setValue={(v)=>this.setState({ModulusOfRupture:v})}
                                            step={0.01}
                                            min={4.5} max={5}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                        {getGroupControl()}
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Step 3</StepLabel>
                    <StepContent displayPrint="block">
                        <form className={classes.root} noValidate autoComplete="off">
                            <Grid container spacing={4}>
                                <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                    <Grid item xs={12} justify="flex-start">
                                        <Typography variant={'h6'}>Subgrade and Treatment Information</Typography>
                                    </Grid>
                                    <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                          alignItems="flex-end">
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Soil classification system</span>
                                                <span className={classes.dot} style={{flexGrow:1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Input
                                                value={this.state.SoilClassificationSystem}
                                                onChange={(event, newValue) => this.setState({SoilClassificationSystem: newValue})}
                                                id="SoilClassificationSystem"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Soil classification of subgrade</span>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Autocomplete
                                                margin="dense"
                                                id="SoilSub"
                                                options={soilClassSub}
                                                size="small"
                                                value={this.state.SoilSub}
                                                onChange={(event, value) => this.handleSoilSub(value)}
                                                renderInput={(params) => <TextField dense {...params} label=""/>}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} spacing={1} alignItems="flex-end" justify="center">
                                    <Grid item xs={12} justify="flex-start">
                                        <Typography variant={'h6'}>Base Layer Information</Typography>
                                    </Grid>
                                    <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                          alignItems="flex-end">
                                        <ComtrolwithSlider
                                            title={'Base layer thickness (cm)'}
                                            classes={classes}
                                            value={this.state.BaseThickness}
                                            setValue={(v)=>this.setState({BaseThickness:v})}
                                            step={1}
                                            min={this.state.BaseThicknessMin} max={this.state.BaseThicknessMax}
                                            error={this.errorFunc.Step3.BaseThickness()}
                                            helperText={this.errorFunc.Step3.BaseThickness()}
                                        />
                                    </Grid>
                                    <Grid container item xs={11} md={10} lg={8} spacing={1} justify="center"
                                          alignItems="flex-end">
                                        <ComtrolwithSlider
                                            title={'Modulus of base layer (MPa)'}
                                            classes={classes}
                                            value={this.state.ModulusBase}
                                            setValue={(v)=>this.setState({ModulusBase:v})}
                                            min={350} max={20000}
                                            error={this.errorFunc.Step3.BaseThickness()}
                                            helperText={this.errorFunc.Step3.BaseThickness()}
                                        />
                                        <Grid item xs={8} justify="flex-start">
                                            <Grid container xs={12} justify="flex-start">
                                                <span>Composite k-value (MPa/m)</span>
                                                <span className={classes.dot} style={{flexGrow: 1}}/>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField type="number" id="CompositeK " value={this.state.CompositeK}
                                                       onChange={(event)=>this.setState({CompositeK:+event.target.value})}
                                                       InputProps={{inputProps:{
                                                           className: classes.hideArrow,
                                                       }}}
                                                       />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                        {getGroupControl()}
                    </StepContent>
                </Step>
            </Stepper>
            {this.state.activeStep === this.state.stepsLength && (
                <>
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Button onClick={this.handleModify} className={classes.button}
                                size="small"
                                startIcon={<EditIcon/>}
                        >
                            Modify
                        </Button>
                        <Button onClick={this.handleReset} className={classes.button}
                                size="small"
                                startIcon={<RefreshIcon/>}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<PrintIcon/>}
                            // onClick={()=>this.props.print(this.state)}
                            onClick={()=>window.print()}
                        >
                            Print
                        </Button>
                        {/*<Button*/}
                        {/*    variant="contained"*/}
                        {/*    color="primary"*/}
                        {/*    size="small"*/}
                        {/*    className={classes.button}*/}
                        {/*    startIcon={<SaveIcon/>}*/}
                        {/*    // onClick={()=>this.props.print(this.state)}*/}
                        {/*    onClick={this.onSaveInput}*/}
                        {/*>*/}
                        {/*    Save input*/}
                        {/*</Button>*/}
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<ShowChartIcon/>}
                            // onClick={()=>this.props.print(this.state)}
                            onClick={()=>this.setState({openAnalytics:true})}
                        >
                            ANALYSIS RESULT
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={this.props.toMenu}
                            className={classes.button}
                            startIcon={<HomeIcon/>}
                        >
                            To Main Menu
                        </Button>
                    </Paper>
                </>
            )}
            </Grid>
                {this.state.finished ?<Grid style={{width: 'calc(100% - 220px)'}} item>
                    <Report
                        data={this.state}
                        AnalysisPunchouts={this.props.AnalysisPunchouts()}
                        AnalysisSlabThickness={this.props.AnalysisSlabThickness()}
                    />
                </Grid>:''}
            </Grid>
        </Paper>
            {(this.state.helperEl&& this.state.helperEl.content && !this.state.helperEl.content.map) ?
                <Popper
                    placement="right"
                    disablePortal={false}
                    open={true}
                    anchorEl={this.state.helperEl.el}
                    modifiers={{
                        flip: {
                            enabled: true,
                        },
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: 'window',
                        },
                        arrow: {
                            enabled: true,
                        },
                    }}
                    style={{zIndex: 4}}
                >
                    <Card className={classes.helpHolder}>
                        {this.state.helperEl.freeze?<IconButton aria-label="close" className={classes.closeButton} onClick={this.handleCloseHelper}>
                            <CloseIcon />
                        </IconButton>:''}
                        {this.state.helperEl.content.src ?
                            <TransformWrapper
                                defaultScale={1}
                                defaultPositionX={1}
                                defaultPositionY={1}
                            >
                                <TransformComponent>
                            <img
                                src={this.state.helperEl.content.src}
                                style={{maxWidth: 600, height: 'auto'}}
                            /></TransformComponent></TransformWrapper> :
                            this.state.helperEl.content.text
                        }
                    </Card>
                </Popper> : ''
            }
            <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={this.state.openAnalytics}
                onClose={()=>this.setState({openAnalytics:false})}>
                <DialogTitle id="responsive-dialog-title" onClose={()=>this.setState({openAnalytics:false})}>Analysis</DialogTitle>
                <DialogContent>
                Result is not available
                </DialogContent>
            </Dialog>
            <Popper
                placement="right"
                disablePortal={false}
                open={(this.state.helperEl&& this.state.helperEl.content&& this.state.helperEl.content.map)}
                anchorEl={this.state.helperEl&&this.state.helperEl.el}
                modifiers={{
                    flip: {
                        enabled: true,
                    },
                    preventOverflow: {
                        enabled: true,
                        boundariesElement: 'window',
                    },
                    arrow: {
                        enabled: true,
                    },
                }}
                style={{zIndex: 4}}
            >
                <Card style={{width:800}}>
                    {this.state.helperEl&&this.state.helperEl.freeze?<IconButton aria-label="close" className={classes.closeButton} onClick={this.handleCloseHelper}>
                        <CloseIcon />
                    </IconButton>:''}

                {/*<Region highlight={this.state.currentRegions}*/}
                {/*        target={this.state.Region}*/}
                {/*        selected={(value)=>{*/}
                {/*    if (value)*/}
                {/*        this.setState({*/}
                {/*            Region: value,*/}
                {/*            Area: counties[value].length === 1 ? counties[value][0] : null*/}
                {/*        });*/}
                {/*    else*/}
                {/*        this.setState({Region: value})*/}
                {/*}}/>*/}
                </Card>
            </Popper>
        </Container>);
    }
}

export default withStyles(styles)(CRCP);
