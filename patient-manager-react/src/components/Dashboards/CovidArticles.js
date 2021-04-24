import React, { Component } from "react";
import { Link } from "react-router-dom";

var random = 0;

class CovidArticles extends Component{
    constructor(){
        super();
        random = Math.floor(Math.random() * 5); 
    }
    
    render(){
        var articles = {
            //https://www.cdc.gov/mmwr/volumes/70/wr/mm7017e3.htm?s_cid=mm7017e3_x
            0:<div class="overflow-auto text-left p-5" style={{height:"80vh"}}>
                <h3 class="font-weight-bold">
                    Health Care Utilization and Clinical Characteristics of Nonhospitalized Adults in an Integrated Health Care System 28–180 Days After COVID-19 Diagnosis — Georgia, May 2020–March 2021
                </h3>
                <p>
                As of April 19, 2021, 21.6 million COVID-19 cases had been reported among U.S. adults, most of whom had mild or moderate disease that did not require hospitalization (1). Health care needs in the months after COVID-19 diagnosis among nonhospitalized adults have not been well studied. To better understand longer-term health care utilization and clinical characteristics of nonhospitalized adults after COVID-19 diagnosis, CDC and Kaiser Permanente Georgia (KPGA) analyzed electronic health record (EHR) data from health care visits in the 28–180 days after a diagnosis of COVID-19 at an integrated health care system. Among 3,171 nonhospitalized adults who had COVID-19, 69% had one or more outpatient visits during the follow-up period of 28–180-days. Compared with patients without an outpatient visit, a higher percentage of those who did have an outpatient visit were aged ≥50 years, were women, were non-Hispanic Black, and had underlying health conditions. Among adults with outpatient visits, 68% had a visit for a new primary diagnosis, and 38% had a new specialist visit. Active COVID-19 diagnoses* (10%) and symptoms potentially related to COVID-19 (3%–7%) were among the top 20 new visit diagnoses; rates of visits for these diagnoses declined from 2–24 visits per 10,000 person-days 28–59 days after COVID-19 diagnosis to 1–4 visits per 10,000 person-days 120–180 days after diagnosis. The presence of diagnoses of COVID-19 and related symptoms in the 28–180 days following acute illness suggests that some nonhospitalized adults, including those with asymptomatic or mild acute illness, likely have continued health care needs months after diagnosis. Clinicians and health systems should be aware of post-COVID conditions among patients who are not initially hospitalized for acute COVID-19 disease.

                Patients aged ≥18 years who received positive results for SARS-CoV-2 (the virus that causes COVID-19) by polymerase chain reaction testing performed during April 4–September 17, 2020, and for whom ≥180 days had elapsed since their testing date were identified in KPGA EHR data. Patients were not included in the analysis if they were hospitalized in the 28 days after COVID-19 diagnosis, were pregnant during the 12 months before or at the time of COVID-19 diagnosis, or were not continuously enrolled in KPGA during the year preceding COVID-19 diagnosis. Among 3,171 patients included in the analysis, health care utilization and International Classification of Diseases, Tenth Revision (ICD-10) diagnostic codes were obtained for outpatient (i.e., clinic or urgent care) and emergency department visits, and hospitalizations occurring 28–180 days after COVID-19 diagnosis.

                Health care utilization was determined based on the number, type (i.e., video, telephone, and in-person), setting (i.e., clinic, urgent care, emergency department, and hospital), and clinical specialty of visits. New specialty visits were defined as specialists that a patient had not consulted in the 12 months preceding COVID-19 diagnosis. New specialty visits were classified as potentially related to COVID-19 based on previously described multiorgan effects in post-COVID conditions (2). Clinical characteristics were ascertained through active primary and secondary** ICD-10 codes for outpatient visits. ICD-10 codes were classified as new diagnoses if they had not been documented in the 12 months preceding COVID-19 diagnosis; otherwise, they were classified as preexisting conditions. Administrative ICD-10 codes were classified as “other.” Primary diagnoses were used to classify visit type as being for a new or preexisting condition or other. Primary and secondary diagnoses were used to describe common visits diagnoses and were classified as COVID-19–related, potentially COVID-19–related, new, or preexisting. All health care utilization and clinical characteristics were described at 28–59, 60–119, and 120–180 days after COVID-19 diagnosis. Diagnoses were described as diagnosis-specific visit rates*** (visits per 10,000 person-days). Continuous variables were compared using t-tests or Wilcoxon signed-rank tests, and proportions were compared using chi-square or Fisher’s exact tests, as required. SAS (version 9.4; SAS Institute) was used to perform statistical analyses. This activity was reviewed by CDC and was conducted consistent with applicable federal law and CDC policy.

                Among 3,171 identified adults with COVID-19, a total of 2,177 (69%) had one or more outpatient visits 28–180 days after COVID-19 diagnosis. The proportion of adults with one or more visits was significantly higher among adults aged ≥65 years (88%) than among those aged 18–49 years (66%), among women (76%) than among men (59%), among non-Hispanic Black adults (71%) than among all others (68%) (p = 0.04), and among adults with three or more underlying health conditions (83%) than among those with no (60%) or one or two (69%) underlying conditions.

                mong adults with one or more outpatient visits, 7,991 visits occurred 28–180 days after COVID-19 diagnosis, with a median of two (interquartile range = 1–4) visits per patient (Table 2). Fewer than 2% (32) of patients were hospitalized 28–180 days after COVID-19 diagnosis. More than two thirds of patients (1,617; 68%) had visits for a new primary diagnosis. Among specialists visited, 1,627 (75%) patients visited a family, geriatric, or internal medicine provider, and 823 (38%) visited with a new specialist. Common new specialty visits potentially related to COVID-19 included dermatology (16%), behavioral/mental health (11%), gastroenterology (11%), and cardiology (10%). Overall, 58 (3%) patients saw a pulmonologist; 41 (71%) of these patients had not been evaluated by this specialty in the 12 months preceding their COVID-19 diagnosis.

                COVID-19 was recorded as an active diagnosis for 210 (10%) of 2,177 patients who had one or more outpatient visit within 180 days of COVID-19 diagnosis. COVID-19–related visits declined from 24 per 10,000 person-days during the 28–59-day interval to fewer than two per 10,000 person-days during the 120–180-day interval. Visits per 10,000 person-days for symptoms potentially related to COVID-19 declined during these same intervals, including those for throat or chest pain (from seven per 10,000 person-days to four), shortness of breath (from eight to three), cough (from four to two), and malaise and fatigue (from four to two). In contrast, rates of visits with chronic disease diagnoses (e.g., hypertension and diabetes) and urinary tract infections changed little over time.
                </p>
            </div>,
            //https://www.cdc.gov/mmwr/volumes/70/wr/mm7016a3.htm?s_cid=mm7016a3_x
            1:<div class="overflow-auto text-left p-5" style={{height:"80vh"}}>
                <h3 class="font-weight-bold">
                    COVID-19 Outbreaks in Correctional Facilities with Work-Release Programs — Idaho, July–November 2020
                </h3>
                <p>
                As of April 16, 2021, U.S. correctional and detention facilities reported 399,631 cases of COVID-19 in incarcerated persons, resulting in 2,574 deaths (1). During July 14–November 30, 2020, COVID-19 was diagnosed in 382 persons incarcerated in Idaho correctional facilities with work-release programs. Work-release programs (which place incarcerated persons in community businesses) have social and economic benefits, but might put participants at increased risk for bidirectional transmission of SARS-CoV-2, the virus that causes COVID-19. The Idaho Department of Correction (IDOC) operates 13 state-run correctional facilities, including six low-security facilities dedicated to work-release programs. This report describes COVID-19 outbreaks in five IDOC facilities with work-release programs,* provides the mitigation strategies that IDOC implemented, and describes the collaborative public health response. As of November 30, 2020, 382 outbreak-related COVID-19 cases were identified among incarcerated persons in five Idaho correctional facilities with work-release programs; two outbreaks were linked to food processing plants. Mitigation strategies that helped to control outbreaks in IDOC facilities with work-release programs included isolation of persons with COVID-19, identification and quarantine of close contacts, mass testing of incarcerated persons and staff members, and temporary suspension of work-release programs. Implementation of public health recommendations for correctional and detention facilities with work-release programs, including mass testing and identification of high-risk work sites, can help mitigate SARS-CoV-2 outbreaks. Incarcerated persons participating in work-release should be included in COVID-19 vaccination plans.

A COVID-19 case was defined as detection of SARS-CoV-2 by a nucleic acid amplification test collected from a person incarcerated in an IDOC facility during July 14–November 30, 2020. Cases were reported to the Idaho Department of Health and Welfare (IDHW). Facility information and work-release assignments were provided by IDOC. Because IDOC facilities lacked space for individual quarantine and isolation, close contacts were quarantined in cohorts for 14 days from the date of exposure. COVID-19 patients were isolated in cohorts or transferred to an IDOC COVID-19 unit** for at least 14 days. Clinical care was provided by a privately held prison health care contractor, which maintained a COVID-19 log to track testing, symptoms, quarantine, and medical isolation, and regularly shared the data with IDHW. Routine periodic mass testing of staff members and incarcerated persons for SARS-CoV-2 was conducted by IDOC. This activity was reviewed by CDC and was conducted consistent with applicable federal law and CDC policy.

During July 14–November 30, 2020, COVID-19 outbreaks occurred at five IDOC facilities with work- release programs. The facilities included four metropolitan community reentry centers (CRCs) with approximately 120 work sites in multiple industries (including manufacturing, food processing, agriculture, construction, retail, and hospitality) and a rural work camp with work sites in the agricultural sector. IDOC provided transportation to and from work sites. A total of 382 COVID-19 cases were identified among incarcerated persons, including 76 (20%) cases in one facility housing women only, and 306 (80%) cases in four facilities housing men only. The median patient age was 37 years (range = 21–69 years). Among COVID-19 patients, 218 (57.1%) were non-Hispanic White persons, 40 (10.5%) were Hispanic or Latino persons, 10 (2.6%) were Black persons, and nine (2.4%) were American Indian or Alaska Native persons; race/ethnicity data were missing for 105 (27.5%) patients. No hospitalizations or deaths occurred.

IDOC facilities provided various housing arrangements for 108–276 persons; the number of COVID-19 cases at each facility ranged from nine to 148 (Table). The total number of incarcerated persons was unavailable because facility populations fluctuated over time, and race and ethnicity data for all incarcerated persons at these facilities were not available. Most cases (64.1%) were identified through mass testing; 13.6% cases were in persons with COVID-19–compatible symptoms. Initial cases at IDOC facilities were identified during July–August 2020, at the same time increases in community incidence occurred in the counties where facilities were located (Figure).

Information on work-release placements was available for CRC A and the work camp. The first COVID-19 case in CRC A was identified on July 14, 2020, in an incarcerated person working at a food processing plant. A COVID-19 outbreak had previously been identified among nonincarcerated employees at this workplace; IDOC was not aware of the ongoing outbreak until notified by public health officials on July 22, 2020, which prompted ongoing communication among IDOC and public health partners. Subsequent IDHW guidance recommended that correctional facilities require work-release sites to notify them of COVID-19 cases among employees and suspend work-release during COVID-19 outbreaks until all close contacts were quarantined and tested.*** At CRC A, cases occurred in 75 incarcerated persons, 16 (21%) of whom worked onsite and 59 (79%) of whom worked at businesses in the community (including 12 persons at the aforementioned food processing plant, five at a car dealership, four at a different food processing plant, four at a manufacturing facility, and 34 at 25 other businesses). After mass testing at CRC A on August 4, 2020, and subsequent isolation of patients and quarantine of close contacts, only one new case was identified at this facility. Seventeen COVID-19 cases were identified at the work camp in July among incarcerated persons working at a single food processing plant. The first two of these cases experienced symptom onset on July 13, 2020, preceded by two cases in nonincarcerated food plant employees with symptom onset on July 9 and July 12, suggesting that the work camp outbreak might have resulted after incarcerated persons were exposed to infection at the work site.

COVID-19 mitigation measures at all 13 IDOC-operated correctional facilities included intensified cleaning and mandatory use of face masks for staff members and incarcerated persons (hand soap and four reusable face masks distributed to each incarcerated person), and periodic SARS-CoV-2 mass testing. Universal temperature checks and symptom screenings were conducted daily and at entry. New admissions were quarantined for 14 days and tested for SARS-CoV-2 before transfer to general housing. The percentage of positive test results from mass testing at IDOC facilities with work-release ranged from 1% to 92% (Table). All cases identified during mass testing occurred in persons who were asymptomatic at the time of testing.

Mitigation strategies at IDOC facilities with work-release programs included 1) providing temperature checks and symptom screening before incarcerated persons departed to work sites and upon their return; 2) ensuring that face masks were worn during transport; 3) requiring employers to provide a COVID-19 safety plan; 4) documenting work-site safety measures, including physical distancing, mask use, and hand hygiene; and 5) conducting employer site checks to confirm safety standards were being maintained. Three IDOC facilities with work-release programs erected temporary housing structures to create more space for isolation and quarantine. Work-release was suspended temporarily at three facilities (CRC C, CRC D, and the work camp) to help control outbreaks (Figure).

Collaborative public health response initiatives were also implemented. IDHW hosted weekly calls with representatives from IDOC, the health care contractor, local public health districts, and Boise VA Medical Center laboratory to share information on cases, clinical capacity, mass testing, and public health guidance. IDOC regularly provided lists of CRC work sites to IDHW; public health officials notified IDOC of work sites considered to be high-risk for COVID-19 transmission (e.g., congregate setting without mitigation measures) or those experiencing active outbreaks. These collaborations increased testing availability and prompted IDOC to reassign some work-release participants to lower-risk work sites.
                </p>
            </div>,
            //https://www.cdc.gov/mmwr/volumes/70/wr/mm7016a2.htm?s_cid=mm7016a2_x
            2:<div class="overflow-auto text-left p-5" style={{height:"80vh"}}>
                <h3 class="font-weight-bold">
                Airport Traveler Testing Program for SARS-CoV-2 — Alaska, June–November 2020
                </h3>
                <p>
                Travel can facilitate SARS-CoV-2 introduction. To reduce
introduction of SARS-CoV-2 infections, the state of Alaska
implemented a program on June 6, 2020, for arriving air, sea,
and road travelers that required either molecular testing for
SARS-CoV-2, the virus that causes COVID-19, or a 14-day
self-quarantine after arrival. The Alaska Department of Health
and Social Services (DHSS) used weekly standardized reports
submitted by 10 participating Alaska airports to evaluate
air traveler choices to undergo testing or self-quarantine,
traveler test results, and airport personnel experiences while
implementing the program. Among 386,435 air travelers
who arrived in Alaska during June 6–November 14, 2020,
a total of 184,438 (48%) chose to be tested within 72 hours
before arrival, 111,370 (29%) chose to be tested on arrival,
and 39,685 (10%) chose to self-quarantine without testing
after arrival. An additional 15,112 persons received testing at
airport testing sites; these were primarily travelers obtaining
a second test 7–14 days after arrival, per state guidance. Of
the 126,482 airport tests performed in Alaska, 951 (0.8%)
results were positive, or one per 406 arriving travelers. Airport
testing program administrators reported that clear communication, preparation, and organization were vital for operational
success; challenges included managing travelers’ expectations
and ensuring that sufficient personnel and physical space were
available to conduct testing. Expected mitigation measures such
as vaccination, physical distancing, mask wearing, and avoidance of gatherings after arrival might also help limit postarrival
transmission. Posttravel self-quarantine and testing programs
might reduce travel-associated SARS-CoV-2 transmission and
importation, even without enforcement. Traveler education and
community and industry partnerships might help ensure success.
To assess the airport traveler testing program, Alaska DHSS
reviewed Alaska’s COVID-19 requirements and testing operations for arriving air travelers during June 6–November 14,
2020. Although travelers entering Alaska by road and sea were
also subject to these requirements, entry by road and sea was
minimal after Canada began restricting nonessential transit on
March 20, 2020 (1), and these ports of entry neither provided
weekly briefs nor routinely offered onsite testing; therefore,
this report is limited to an analysis of the air traveler program.
Airport programs were asked to provide weekly reports on the
numbers of incoming flights, passengers screened for symptoms, passengers tested within 72 hours before arrival, passengers who chose to self-quarantine for 14 days after arrival,
passengers tested at the airport, and positive test results. In
addition to comments provided in the weekly briefs, airport
program administrators from all 10 participating airports
were also asked to provide improvement recommendations;
five airports responded in a narrative format, from which
themes were extracted. This activity was reviewed by CDC
and was conducted consistent with applicable federal law and
CDC policy.*
As part of the airport testing program, airports were required
to screen travelers arriving from out of state for symptoms,
offer testing, and record whether travelers chose testing or
self-quarantine. Alaska DHSS contracted with local health
organizations and enlisted local governments to staff and
manage testing program operations. Program personnel
collected samples within or just outside the Transportation
Security Administration (TSA) secure area at all 10 airports.
Specimens were analyzed by reverse transcription–polymerase
chain reaction at the Alaska State Public Health Laboratories
and commercial laboratories. Traveler information was initially
collected on paper forms and later via the Alaska Travel Portal
(i.e., COVIDSECURE), a web-based application created to
manage travel-associated COVID-19 data. The software
allowed travelers to report symptoms, close contacts, and
demographic information and to upload and view test results
and enter their self-quarantine location.
A travel mandate implemented in Alaska during March
2020 required all travelers entering Alaska to self-quarantine
for 14 days after arrival. In June, testing was introduced as an
option to shorten the 14-day quarantine, with a test near the
time of arrival and a second test 7–14 days after arrival. In
August, the option for a 14-day self-quarantine without testing was removed for nonresidents; testing before travel was
encouraged for nonresidents, who were charged a $250 fee if
they chose to test at the airport on arrival. Starting in October,
the requirement for a second test 7–14 days after arrival was
removed (Box).
During June 6–November 14, 2020, a total of 386,435 air
travelers who arrived in Alaska were screened for symptoms;
184,438 (48%) arrived with proof of a negative or pending
SARS-CoV-2 test result, 111,370 (29%) chose to be tested on
arrival, and 39,685 (10%) chose to self-quarantine after arrival
for 14 days without testing (Figure 1). The remaining 50,942
(13%) travelers were exempt from the testing and quarantine
requirements because they 1) were following an alternative
workforce protection plan outlining alternative strategies to
reduce the risk for importation that had been submitted by
their employer to the state, 2) arrived with a previous positive test result and proof of completion of isolation, 3) had
traveled outside Alaska for 72 hours, 4) left the airport
before screening, or 5) were a child exempt from screening
requirements because of age. Weekly airport briefs submitted
to Alaska DHHS indicated that 10 travelers each week were
noncompliant with registration or screening. An additional
15,112 persons received testing at airport testing sites; these
were primarily travelers obtaining a second test 7–14 days after
arrival, per state guidance.
During June–September, 1.0% of airport test results were
positive; this increased to 2.6% during October–November
(Figure 2). Over the entire study period (June–November),
951 tests were positive (0.8% overall). The percentage of test
results that were positive at airports was consistently lower than
the overall percentage in Alaska.
In response to a November survey, airport testing program
administrators reported that clear communication, preparation, and organization were important for operational success; challenges included managing travelers’ expectations
and ensuring sufficient personnel and physical space. For
example, administrators reported that travelers were frequently
unprepared for screening and that space limitations resulted in
travelers being unable to maintain sufficient physical distance.
One airport noted an improvement in passenger attitudes and their willingness to complete declaration forms after the initiation of a broad educational campaign for travelers, a hotline for
travelers to ask questions, and targeted messaging for travelers
before and during travel. Administrators also reported that the
travel screening and testing program was resource-intensive.
For example, during June–November, Alaska’s largest airport
had a weekly average of nearly 12,000 passengers and 51 outof-state flight arrivals; this airport required up to 22 screening
personnel and five testing personnel per day and performed
an average of approximately 3,500 tests per week. The cost of
this program was also substantial, with a budget of $26 million
for June–December
                </p>
            
            </div>,
            3:<div class="overflow-auto text-left p-5" style={{height:"80vh"}}>
            <h3 class="font-weight-bold">
            Laboratory Modeling of SARS-CoV-2 Exposure Reduction Through Physically Distanced Seating in Aircraft Cabins Using Bacteriophage Aerosol — November 2020
                </h3>
                <p>
                Aircraft can hold large numbers of persons in close proximity
for long periods, which can increase the risk for transmission
of infectious disease.* Current CDC guidelines recommend
against travel for persons who have not been vaccinated against
COVID-19, and a January 2021 CDC order requires masking for all persons while on airplanes., Research suggests
that seating proximity on aircraft is associated with increased
risk for infection with SARS-CoV-2, the virus that causes
COVID-19 (1,2). However, studies quantifying the benefit
of specific distancing strategies to prevent transmission, such
as keeping aircraft cabin middle seats vacant, are limited.
Using bacteriophage MS2 virus as a surrogate for airborne
SARS-CoV-2, CDC and Kansas State University (KSU)
modeled the relationship between SARS-CoV-2 exposure and
aircraft seating proximity, including full occupancy and vacant
middle seat occupancy scenarios. Compared with exposures in
full occupancy scenarios, relative exposure in vacant middle seat
scenarios was reduced by 23% to 57% depending upon the
modeling approach. A 23% exposure reduction was observed
for a single passenger who was in the same row and two seats
away from the SARS-COV-2 source, rather than in an adjacent
middle seat. When quantifying exposure reduction to a full
120-passenger cabin rather than to a single person, exposure
reductions ranging from 35.0% to 39.4% were predicted. A
57% exposure reduction was observed under the vacant middle
seat condition in a scenario involving a three-row section that
contained a mix of SARS-CoV-2 sources and other passengers.
Based on this laboratory model, a vacant middle seat reduces
risk for exposure to SARS-CoV-2 from nearby passengers.
These data suggest that increasing physical distance between
passengers and lowering passenger density could help reduce
potential COVID-19 exposures during air travel. Physical
distancing of airplane passengers, including through policies
such as middle seat vacancy, could provide additional reductions in SARS-CoV-2 exposure risk.
The study consisted of three components. The first involved
analysis of data on virus aerosol dispersion in aircraft cabin
mock-ups from a previous study conducted at KSU during July–August 2017 as part of a pandemic influenza research
initiative (3). Next, these data were used to create a regression
model to estimate the reduction in aerosol concentration as
distance from a source increased. Finally, these regression
models were applied to conceptual aircraft seating scenarios
to simulate the reduction in exposure resulting from vacant
middle seats in an aircraft cabin. Laboratory experiments were
performed with bacteriophage MS2 virus obtained from the
American Type Culture Collection. Bacteriophage MS2 has
frequently been used as a surrogate for pathogenic viruses in
aerosolization studies (4) and was used to approximate the
airborne dispersion of SARS-CoV-2. During the aerosol dispersion study at KSU, mannequins with realistic passenger heat
emission were seated in the cabin mock-ups, and then MS2
aerosol was introduced from a source location and collected
at six different sample locations in the cabin. This process was
repeated four times: twice in a single-aisle cabin and twice in
a twin-aisle cabin (Figure 1), resulting in 24 total samples.**
Because these data were collected before the COVID-19 pandemic, the effects of passengers wearing masks on the aerosol
dispersion behavior were not measured. These viral aerosol data
were then used to create a nonlinear regression model which
assesses the association between the number of plaque-forming
units (PFUs) (evidence of the presence of viable virus) and the distance between source and sample locations. For both singleaisle and twin-aisle scenarios, findings from the nonlinear
regression model indicate that the number of PFUs declined
exponentially with increasing distance (Supplementary Figure,
https://stacks.cdc.gov/view/cdc/104935). In November 2020, CDC applied this data-driven model
to simulate the protective effect of a vacant middle seat versus
full aircraft occupancy. Two analytical approaches were used.
Both approaches analyzed reductions in relative exposures (the
number of PFUs divided by the maximum predicted value)
rather than absolute exposure. The first approach considered only the extra distance between
passengers created by the vacant middle seat. The regression
model estimated exposure as a function of distance to assess the
exposure reduction of moving an adjacent passenger one seat
further away from an infectious passenger, leaving an empty
middle seat between them. The distance effect was explored
further to simulate the total exposure reduction for groups of
passengers up to and including a full simulated cabin of 120
seats. A total of 300 simulations were tested using Monte Carlo
methods, where the number (one to three) and placement of
infectious passengers were varied. The total exposure reduction
for all passengers in the cabin was predicted by placing a source
at an arbitrary seat location and applying the regression model
to calculate relative exposure at all other seat locations, which
were summed to obtain a total exposure for the cabin.
The second approach combined the distance effect predicted by
the regression model and the reduced occupancy effect predicted
by simple probability estimation, as these are inseparable in realistic
arrangements of infectious passengers and other passengers. When
simply defining exposure risk as reduced occupancy, a vacant
middle seat reduced exposure by an estimated 33% compared
with full occupancy, in single-aisle, three-seats-per-side cabins,
because there are 33% fewer potentially infectious passengers.
The first approach predicted a 23% exposure reduction by
moving an adjacent passenger one seat further away from an
infectious passenger. The total reduction in relative exposure
for a full 120-seat cabin yielded reduction of 35.0%–36.4% 35.1%–38.2%, and 35.9%–39.4% for one, two, and three infectious passengers, respectively, depending on their seating pattern.
All sources were placed in window or aisle seats such that the
potential reduction in number of infectious passengers onboard
from vacant middle seating was not considered (Figure 2). The
second approach was applied to a cluster of nine infectious passengers (including three in middle seats) among 18 total passengers
in three rows (Figure 3). When the infectious and other passengers who would have had middle seats were removed, leaving six
infectious passengers out of 12 total passengers remaining in the
window and aisle seats, a 57% exposure reduction was observed.
                </p>
                </div>,
            4:<div class="overflow-auto text-left p-5" style={{height:"80vh"}}>
            <h3 class="font-weight-bold">
            COVID-19 Outbreak Associated with a SARS-CoV-2 R.1 Lineage Variant in a Skilled Nursing Facility After Vaccination Program — Kentucky, March 2021
            </h3>
            <p>
            Although COVID-19 mRNA vaccines demonstrated high
efficacy in clinical trials (1), they were not 100% efficacious. Thus, some infections postvaccination are expected.
Limited data are available on effectiveness in skilled nursing
facilities (SNFs) and against emerging variants. The Kentucky
Department for Public Health (KDPH) and a local health
department investigated a COVID-19 outbreak in a SNF
that occurred after all residents and health care personnel
(HCP) had been offered vaccination. Among 83 residents
and 116 HCP, 75 (90.4%) and 61 (52.6%), respectively,
received 2 vaccine doses. Twenty-six residents and 20 HCP
received positive test results for SARS-CoV-2, the virus that
causes COVID-19, including 18 residents and four HCP
who had received their second vaccine dose >14 days before
the outbreak began. An R.1 lineage variant was detected with
whole genome sequencing (WGS). Although the R.1 variant
has multiple spike protein mutations, vaccinated residents and
HCP were 87% less likely to have symptomatic COVID-19
compared with those who were unvaccinated. Vaccination
of SNF populations, including HCP, is critical to reduce the
risk for SARS-CoV-2 introduction, transmission, and severe
outcomes in SNFs. An ongoing focus on infection prevention
and control practices is also essential. The SNF conducted vaccination clinics using PfizerBioNTech mRNA vaccine on January 10, January 31, and
February 21, 2021. Among 83 residents and 116 HCP,
75 (90.4%) and 61 (52.6%), respectively, received two vaccine doses. All vaccinated residents and HCP were vaccinated
on-site, the majority on January 10 and 31. Four residents and
five HCP received their second dose during the third clinic,
which was 14 days before the outbreak onset.
Before and during the outbreak, SARS-CoV-2 testing was
used for evaluating symptomatic illness in residents and HCP.
Symptom screening of residents and HCP had been ongoing
since March 2020, and twice-weekly screening testing of all
HCP had been occurring since November 2020. A COVID-19
case was defined as a positive SARS-CoV-2 antigen or reverse
transcription–polymerase chain reaction (RT-PCR) test result.
Possible reinfection was defined as a positive SARS-CoV-2 test
result 90 days after a previous laboratory-confirmed infection.
The outbreak was identified during routine HCP antigen
testing on March 1.* This was 8 days after the third vaccination clinic. The index case occurred in an unvaccinated,
symptomatic HCP. Once the outbreak was identified, daily
rapid point-of-care antigen testing of all residents, regardless
of symptoms, was added to the twice-weekly HCP testing.
Additional specimens were collected the same day for RT-PCR
confirmation of positive antigen test results. One week after the
outbreak was identified, resident antigen testing was reduced
to three times weekly, then to twice weekly after no additional
cases were identified for 1 week.
The local health department interviewed HCP and facility staff members to collect information about the cases.
Vaccination status was ascertained through immunization
registry review and facility interviews. COVID-19–related
hospitalizations and deaths were confirmed by medical records
reviews. This activity was reviewed by CDC and was conducted
consistent with applicable federal law and CDC policy.
Relative risks (RRs) were calculated comparing unvaccinated
and vaccinated residents and HCP; vaccine effectiveness
(VE [1−RR of vaccinated versus unvaccinated x 100]) was calculated for the following outcomes: SARS-CoV-2 infection,
symptomatic COVID-19, hospitalization, and death. Persons
who received their second vaccine dose ≥14 days before the
outbreak began were considered vaccinated, consistent with
CDC postvaccination guidance and breakthrough case definition. Ten persons who had received at least 1 dose but had not
received a second vaccine dose ≥14 days before the outbreak
were excluded from analyses.
A sensitivity analysis was conducted using a 7-day threshold
to classify persons as vaccinated, consistent with the PfizerBioNTech vaccine clinical trials (1). Four residents and five
HCP who received their second vaccine dose 8 days before
outbreak identification were classified as vaccinated in this
sensitivity analysis. One HCP who received a single vaccine
dose remained excluded (Supplementary Table https://stacks.
cdc.gov/view/cdc/105235).
KDPH Division of Laboratory Services performed WGS
(2). Genomes were assembled using the StaPH-B Monroe
pipeline, followed by Nextclade** for clade assignment and
mutation calling, Pangolin for lineage assignment, and
Nextstrain for phylogenetic analysis (3).
During the outbreak, 46 COVID-19 cases were identified, including cases in 26 residents (18 fully vaccinated)
and 20 HCP (four vaccinated) (Figure) (Table). Two cases
occurred in residents who had received their second vaccine
dose within 14 days; these two cases were excluded from the
primary analysis. Vaccinated residents and HCP were less
likely to be infected than were unvaccinated persons. Attack
rates in unvaccinated residents (75.0%) were 3 times as high
as those in vaccinated residents (25.4%; RR = 3.0; 95% confidence interval [CI] = 1.7–5.2) and in unvaccinated HCP
(29.6%) were 4.1 times as high as those in vaccinated HCP
(7.1%; RR = 4.1; 95% CI = 1.5–11.6). The estimated VE
against SARS-CoV-2 infection among residents was 66.2%
(95% CI  =  40.5%–80.8%) and among HCP was 75.9%
(95% CI = 32.5%–91.4%).
VE against symptomatic COVID-19 was 86.5%
(95% CI  =  65.6%–94.7%) among residents and 87.1%
(95% CI = 46.4%–96.9%) among HCP. VE against hospitalization was 94.4% (95% CI = 73.9%–98.8%) among residents;
no HCP were hospitalized. Three residents died, two of whom
were unvaccinated (VE = 94.4%; 95% CI = 44.6%–99.4%).
Four possible reinfections were identified (one resident
and three HCP); of these, one HCP was vaccinated. All four
persons experienced symptomatic illness. One resident was infected 300 days earlier and had nine consecutive negative
RT-PCR tests before reinfection, including two within 30 days
of the outbreak. This resident was hospitalized and died.
            </p>

            </div>

        };
        return(
            <div>{articles[random]}</div>
        )

        

    }
}

export default CovidArticles;