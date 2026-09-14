import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { employeeContributions, finalPayEstimate, holidayPay, maternityEstimate, money, mp2Projection, overtimePay, rateConversions } from '../lib/calculators';
import type { RateConfig } from '../types';

type Tool = 'rates'|'overtime'|'holiday'|'final'|'minimum'|'maternity'|'mp2'|'contributions';
const tools: Array<[Tool,string,string,keyof typeof Ionicons.glyphMap]> = [
  ['rates','Daily & hourly rate','Convert a monthly salary','time-outline'],
  ['overtime','Overtime pay','Ordinary-day overtime','moon-outline'],
  ['holiday','Holiday & rest day','Regular holiday or rest day','calendar-outline'],
  ['final','Final pay','Unpaid salary, 13th month and leave','document-text-outline'],
  ['minimum','Minimum wage monthly pay','Daily wage to monthly equivalent','cash-outline'],
  ['maternity','SSS maternity benefit','Based on six highest MSCs','woman-outline'],
  ['mp2','MP2 savings','Five-year savings projection','trending-up-outline'],
  ['contributions','Contribution breakdown','Employee and total deductions','business-outline']
];
const num=(v:string)=>Number(v.replace(/,/g,''))||0;
function Input({label,value,setValue,moneyField=true}:{label:string;value:string;setValue:(v:string)=>void;moneyField?:boolean}){return <View style={s.field}><Text style={s.label}>{label}</Text><View style={s.inputRow}>{moneyField?<Text style={s.prefix}>₱</Text>:null}<TextInput value={value} onChangeText={setValue} keyboardType="decimal-pad" placeholder="0" placeholderTextColor="#98A2B3" style={s.input} accessibilityLabel={label}/></View></View>}
function Result({label,value,detail}:{label:string;value:string;detail?:string}){return <View style={s.result}><Text style={s.resultLabel}>{label}</Text><Text style={s.resultValue} adjustsFontSizeToFit numberOfLines={1} minimumFontScale={0.65}>{value}</Text>{detail?<Text style={s.detail}>{detail}</Text>:null}</View>}

export function ClassicCalculators({rates,back}:{rates:RateConfig;back:()=>void}){
 const [tool,setTool]=useState<Tool|null>(null);const [a,setA]=useState('');const [b,setB]=useState('');const [c,setC]=useState('');const [d,setD]=useState('');
 const reset=(next:Tool|null)=>{setTool(next);setA('');setB('');setC('');setD('')};
 const output=useMemo(()=>{
  if(!tool)return null;
  if(tool==='rates'){const x=rateConversions(num(a));return ['Estimated daily rate',money(x.daily),`Hourly rate: ${money(x.hourly)}`]}
  if(tool==='overtime')return ['Estimated overtime pay',money(overtimePay(num(a),num(b))),`${b||0} hour(s) at 125% of estimated hourly rate`];
  if(tool==='holiday')return ['Estimated pay for days entered',money(holidayPay(num(a),num(b),(c==='rest'?1.3:2))),c==='rest'?'Rest-day estimate at 130%':'Regular-holiday estimate at 200%'];
  if(tool==='final'){const x=finalPayEstimate(num(a),num(b),num(c),num(d));return ['Estimated final pay',money(x.total),`Includes ${money(x.proratedThirteenth)} prorated 13th month and ${money(x.leaveConversion)} leave conversion`];}
  if(tool==='minimum'){const daily=num(a),days=num(b)||26;return ['Monthly wage equivalent',money(daily*days),`${days} paid day(s); use the wage applicable to your region and category`];}
  if(tool==='maternity'){const x=maternityEstimate(num(a),(num(b)||105) as 60|78|105|120);return ['Estimated SSS benefit',money(x.benefit),`Average daily salary credit: ${money(x.averageDailySalaryCredit)}`];}
  if(tool==='mp2')return ['Projected MP2 balance',money(mp2Projection(num(a),num(b)||5,(num(c)||6.5)/100)),`${b||5} year(s), using a hypothetical ${c||6.5}% annual dividend`];
  const x=employeeContributions(num(a),rates);return ['Employee deductions',money(x.total),`SSS ${money(x.sss)} · PhilHealth ${money(x.philHealth)} · Pag-IBIG ${money(x.pagIbig)}`];
 },[tool,a,b,c,d,rates]);
 if(!tool)return <ScrollView contentContainerStyle={s.scroll}><View style={s.header}><Pressable onPress={back} style={s.back} accessibilityRole="button" accessibilityLabel="Back to home"><Ionicons name="arrow-back" size={22}/></Pressable><View style={{flex:1}}><Text style={s.title}>More calculators</Text><Text style={s.sub}>The original KalkulaPH essentials</Text></View></View>{tools.map(([key,title,sub,icon])=><Pressable key={key} style={s.card} onPress={()=>reset(key)} accessibilityRole="button" accessibilityLabel={`${title}. ${sub}`}><View style={s.icon}><Ionicons name={icon} size={22} color="#444CE7"/></View><View style={{flex:1}}><Text style={s.cardTitle}>{title}</Text><Text style={s.cardSub}>{sub}</Text></View><Ionicons name="chevron-forward" size={20} color="#98A2B3"/></Pressable>)}</ScrollView>;
 const meta=tools.find(x=>x[0]===tool)!;
 return <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled"><View style={s.header}><Pressable onPress={()=>reset(null)} style={s.back} accessibilityRole="button" accessibilityLabel="Back to calculator list"><Ionicons name="arrow-back" size={22}/></Pressable><View style={{flex:1}}><Text style={s.title}>{meta[1]}</Text><Text style={s.sub}>{meta[2]}</Text></View></View>
  {tool==='rates'&&<Input label="Monthly salary" value={a} setValue={setA}/>} 
  {tool==='overtime'&&<><Input label="Monthly salary" value={a} setValue={setA}/><Input label="Overtime hours" value={b} setValue={setB} moneyField={false}/></>}
  {tool==='holiday'&&<><Input label="Monthly salary" value={a} setValue={setA}/><Input label="Days worked" value={b} setValue={setB} moneyField={false}/><View style={s.toggle}>{[['holiday','Regular holiday'],['rest','Rest day']].map(x=><Pressable key={x[0]} onPress={()=>setC(x[0])} style={[s.toggleItem,(c||'holiday')===x[0]&&s.toggleActive]} accessibilityRole="button" accessibilityState={{selected:(c||'holiday')===x[0]}}><Text style={(c||'holiday')===x[0]?s.toggleTextActive:s.toggleText}>{x[1]}</Text></Pressable>)}</View></>}
  {tool==='final'&&<><Input label="Unpaid salary" value={a} setValue={setA}/><Input label="Basic salary earned this year" value={b} setValue={setB}/><Input label="Convertible leave days" value={c} setValue={setC} moneyField={false}/><Input label="Monthly salary for leave conversion" value={d} setValue={setD}/></>}
  {tool==='minimum'&&<><Input label="Applicable daily wage" value={a} setValue={setA}/><Input label="Paid days per month" value={b} setValue={setB} moneyField={false}/></>}
  {tool==='maternity'&&<><Input label="Total of six highest MSCs" value={a} setValue={setA}/><Input label="Compensable days (60, 78, 105 or 120)" value={b} setValue={setB} moneyField={false}/></>}
  {tool==='mp2'&&<><Input label="Monthly contribution" value={a} setValue={setA}/><Input label="Years" value={b} setValue={setB} moneyField={false}/><Input label="Assumed annual dividend %" value={c} setValue={setC} moneyField={false}/></>}
  {tool==='contributions'&&<Input label="Monthly compensation" value={a} setValue={setA}/>} 
  {output&&<Result label={output[0]} value={output[1]} detail={output[2]}/>}<Text style={s.note}>Estimate only. Actual pay depends on work schedule, employer policy, eligibility, official tables and rounding.</Text></ScrollView>
}
const s=StyleSheet.create({scroll:{padding:20,paddingBottom:100,gap:14},header:{flexDirection:'row',alignItems:'center',gap:12,marginBottom:5},back:{width:42,height:42,borderRadius:14,backgroundColor:'white',borderWidth:1,borderColor:'#EAECF0',alignItems:'center',justifyContent:'center'},title:{fontSize:25,fontWeight:'800',color:'#101828'},sub:{fontSize:13,color:'#667085',marginTop:2},card:{backgroundColor:'white',borderRadius:18,padding:15,borderWidth:1,borderColor:'#EAECF0',flexDirection:'row',gap:12,alignItems:'center'},icon:{width:44,height:44,borderRadius:14,backgroundColor:'#EEF4FF',alignItems:'center',justifyContent:'center'},cardTitle:{fontSize:15,fontWeight:'800',color:'#101828'},cardSub:{fontSize:12,color:'#667085',marginTop:3},field:{gap:7},label:{fontSize:13,fontWeight:'700',color:'#344054'},inputRow:{height:58,borderRadius:16,borderWidth:1.5,borderColor:'#D0D5DD',backgroundColor:'white',flexDirection:'row',alignItems:'center',paddingHorizontal:16},prefix:{fontSize:18,fontWeight:'700',color:'#667085',marginRight:8},input:{flex:1,fontSize:19,fontWeight:'700',color:'#101828'},result:{marginTop:6,borderRadius:24,padding:22,backgroundColor:'#3448C5'},resultLabel:{color:'#D9E1FF',fontWeight:'700'},resultValue:{color:'white',fontSize:32,fontWeight:'900',marginVertical:6},detail:{color:'#E4E7EC',fontSize:12,lineHeight:18},note:{fontSize:11,lineHeight:17,color:'#667085'},toggle:{flexDirection:'row',backgroundColor:'#EAECF0',padding:4,borderRadius:14},toggleItem:{flex:1,alignItems:'center',padding:11,borderRadius:11},toggleActive:{backgroundColor:'white'},toggleText:{fontWeight:'700',color:'#667085'},toggleTextActive:{fontWeight:'800',color:'#444CE7'}});
