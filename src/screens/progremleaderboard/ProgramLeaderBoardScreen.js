// react native imports
import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

// constants utils & assets
import Colors from '../../utils/constants/Colors';

// UI component
import ProgramLeaderBoardScreenUI from './ProgramLeaderBoardScreenUI';
import {store} from '../../redux/store';
import {URL} from '../../utils/constants/Urls';
import {services} from '../../services/axios/services';
import {appsnackbar} from '../../common/functions/snackbar_actions';
import moment from 'moment';

export default function ProgramLeaderBoardScreen() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [customDatesOptions, setCustomDatesOptions] = useState([]);
  const [state, setState] = useState({
    selectedTab: 'Male',
    eventData: {
      id: 2477,
      name: 'Step-A-Thon Challenge',
      eventDate: '2024-12-07',
      eventTime: '15:57:00',
      description: '',
      registrationEndDate: '31-05-2025 15:57:00',
      eventEndDate: '31-05-2025 15:57:00',
      eventLocalStartDate: '2024-12-07',
      eventLocalEndDate: '2025-05-31',
      eventState: 'PUBLISHED',
      eventStatus: 'PAST',
      eventScope: 'PUBLIC',
      organizers: [
        {
          id: 3,
          name: 'IIS<br>Interface Infosoft',
          organizerLogo: 'Org_logo/Interface.png',
        },
      ],
      showDOB: true,
      showPhone: true,
      showRunnerGroup: false,
      sendInvitation: false,
      eventSupportedDomains: [],
      longDescription: '',
      distKey: 'WTH/0Rm06/wEbEZCH1UsIw==',
      isRegistrationOpen: false,
      isEventResultReady: true,
      skipTimeOnUploadActivity: false,
      showLeaderboard: true,
      showSearchResultsOnResultsView: true,
      showSearchBarOnResultsView: true,
      eventRunCategories: [
        {
          id: 4424,
          category: '1000',
          categoryName: '1000',
          challengeGoal: 'DAILY_TARGET',
          startTime: '07-12-2024 00:00:00',
          endTime: '01-06-2025 00:00:00',
          activityType: {
            id: 4,
            type: 'STEPS',
            description: 'Steps Activity',
            displayName: 'Steps',
            primaryDisplayParams: 'STEPS',
          },
          eventSupportedActivityType: {
            id: 4353,
            activityType: {
              id: 4,
              type: 'STEPS',
              description: 'Steps Activity',
              displayName: 'Steps',
              primaryDisplayParams: 'STEPS',
            },
            displayName: 'Steps',
            participantType: 'REGULAR',
            primaryDisplayParams: 'STEPS',
            allowActivityUpload: true,
            maxTolerance: 0,
            certificateSettings:
              '{"Steps":false,"Speed":false,"Header":false,"Pace":false,"SuffixActivityUnit":true,"Time":true,"Bib":true,"Profile":true,"Distance":true,"Route":true}',
          },
          registrationFee: 0,
          supportedDistances: [],
          maxTickets: 0,
          ticketsSold: 1,
          bibStartNumber: 101,
          actualDistance: 5000000,
          participantType: 'REGULAR',
          ticketSoldOut: false,
        },
      ],
      activities: [
        {
          eventSupportedActivityTypeId: 4353,
          id: 4,
          type: 'STEPS',
          displayName: 'Steps',
          participantType: 'REGULAR',
          challengeParams: 'STEPS',
          primaryDisplayParams: 'STEPS',
          allowActivityUpload: true,
          maxTolerance: 0,
          activityPriority: 'PRIMARY',
        },
      ],
      type: 'CHALLENGE',
      summaryGenerated: true,
      mapGenerated: false,
      challengeType: 'BOTH',
      image: {
        mediaType: 'image/jpeg',
        url: 'event_2477/event_banner_img.jpeg',
        fileName: '/event_2477/event_banner_img.jpeg',
        objectType: 0,
      },
      resultBannerImage: {
        mediaType: 'image/jpeg',
        url: 'event_2477/event_banner_img.jpeg',
        fileName: '/event_2477/result_banner_img12.jpeg',
        objectType: 0,
      },
      showHtWtOnSignup: false,
      hideFreeBlockWhenFeeZero: true,
      showActivityTypeOnRegistration: true,
      showCategoryOnRegistration: true,
      emailAndContactMandatoryOnRegistration: true,
      dobMandatoryOnSignup: true,
      showRunnerGroupGraph: false,
      totalRegistrations: 109,
      totalDistanceCovered: 1579473.51,
      totalActivityRecieved: 174,
      allowVideoUpload: false,
      mapToShow: 'DEFAULT',
      activityServices: 'GOOGLEFIT',
      showPincode: true,
      showEmailFieldOnLogin: true,
      showAgeGroup: true,
      showIndividual: true,
    },
  });

  const [leaderBoardDetails, setLeaderBoardDetails] = useState({});
  const [dropDownValue, setDropDownValue] = useState({
    topParticipant: {
      label: '10',
      value: '10',
    }, // default value
    weekFilter: {
      label: 'Overall',
      value: '',
    },
  });

  const [options] = useState({
    tabs: [
      {id: 0, title: 'Male'},
      {id: 1, title: 'Female'},
    ],
  });
  const [shouldApplyFilters, setShouldApplyFilters] = useState(false);

  useEffect(() => {
    if (state?.eventData) {
      const weekOptions = generateWeekFilterOptions(
        state.eventData,
        state.eventData.id,
      );
      setCustomDatesOptions(weekOptions);

      // Only update dropdown value if missing
      setDropDownValue(prev => {
        const updated = {
          ...prev,
          weekFilter:
            prev.weekFilter?.value !== undefined
              ? prev.weekFilter
              : weekOptions[0],
          topParticipant:
            prev.topParticipant?.value !== undefined
              ? prev.topParticipant
              : {label: '10', value: '10'},
        };

        return updated;
      });

      setShouldApplyFilters(true); // will call getLeaderBoardDetails in second useEffect
    }
  }, [state.eventData]);

  useEffect(() => {
    if (shouldApplyFilters) {
      getLeaderBoardDetails();
      setShouldApplyFilters(false);
    }
  }, [shouldApplyFilters, getLeaderBoardDetails]);

  // Fetch leaderboard details when the component mounts
  const getLeaderBoardDetails = useCallback(async () => {
   const fromDate = dropDownValue?.weekFilter?.fromDate
  ? moment(dropDownValue.weekFilter.fromDate).startOf('day').format('YYYY-MM-DD HH:mm:ss')
  : '';

const toDate = dropDownValue?.weekFilter?.toDate
  ? moment(dropDownValue.weekFilter.toDate).endOf('day').format('YYYY-MM-DD HH:mm:ss')
  : '';

    const activityType = state?.eventData?.activities?.[0]?.type || 'STEPS';
    const categoryId = state?.eventData?.eventRunCategories?.[0]?.id;
    const activityPriority =
      state?.eventData?.activities?.[0]?.activityPriority || 'PRIMARY';
    const limit = dropDownValue?.topParticipant?.value || '10';

    const params = {
      activity: activityType,
      categoryId: categoryId,
      activityPriority: activityPriority,
      limit: limit  ? limit : '10',
      fromDate: fromDate ? fromDate : '',
      toDate: toDate ? toDate : '', 
    };

    const queryString = new URLSearchParams(params).toString();
    const apiUrl = `https://192.168.1.49:8443/api/v1/public/leaderboard/2477`;

    console.log(`API GET: ${apiUrl}?${queryString}`);

    try {
      const response = await services._get(apiUrl, {params});

      const formatData = data =>
        data.map((item, index) => ({
          id: item.runnerId.toString(),
          name: `${item.firstName} ${item.lastName || ''}`.trim(),
          score: item.totalSteps,
          backgroundColor:
            index % 3 === 0
              ? '#E6F7FF'
              : index % 3 === 1
              ? '#FFECE6'
              : '#FFF7E6',
          avatar: item.profileLink
            ? `https://192.168.1.49:8443/${item.profileLink}`
            : 'https://img.icons8.com/3d-fluency/94/user-male-circle.png',
        }));

      const participants = response?.data?.particiapants?.[0];
      const male = participants?.maleActivities || [];
      const female = participants?.femaleActivities || [];
console.log(response);

      setLeaderBoardDetails({
        male: formatData(male),
        female: formatData(female),
      });
    } catch (error) {
      console.log('Error getting leaderboard details', error);
      appsnackbar.showErrMsg('Something went wrong!');
    }
  }, [dropDownValue]);

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  const handleChange = tab => {
    setState(prev => ({...prev, selectedTab: tab.title}));
  };

  const onApplyFilters = () => {
    setShouldApplyFilters(true);
  };

  const handleDropdownChange = (field, value) => {
    setDropDownValue(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateWeekFilterOptions = (eventData, eventId) => {
    let dropdownDates = [
      {
        label: 'Overall',
        value: '',
      },
    ];

    let todays_date = {
      label: "Today's Leaderboard",
      value: `${moment().format('YYYY-MM-DD')} ${moment().format(
        'YYYY-MM-DD',
      )}`,
      fromDate: moment().format('YYYY-MM-DD'),
      toDate: moment().format('YYYY-MM-DD'),
    };

    const initialDate = eventData?.eventLocalStartDate
      ? moment(eventData?.eventLocalStartDate, 'YYYY-MM-DD')
      : eventData?.localStartDate
      ? moment(eventData?.localStartDate, 'YYYY-MM-DD')
      : moment(eventData?.eventDate, 'YYYY-MM-DD');

    const endDate = eventData?.eventLocalEndDate
      ? moment(eventData?.eventLocalEndDate, 'YYYY-MM-DD')
      : eventData?.localEndDate
      ? moment(eventData?.localEndDate, 'YYYY-MM-DD')
      : moment(eventData?.eventEndDate, 'DD-MM-YYYY hh:mm:ss');

    let days = endDate.diff(initialDate, 'days');
    let weeks = Math.ceil(days / 7);

    let weekInitialDate = initialDate.clone();
    let weekEndDate = endDate.clone();

    let isLiveEvent = moment().isBetween(
      weekInitialDate.format('YYYY-MM-DD'),
      weekEndDate.format('YYYY-MM-DD'),
      undefined,
      '[]',
    );

    if (days > 10) {
      let formattedWeeks = [];

      for (let i = 1; i <= weeks; i++) {
        let weekStartDate = weekInitialDate.format('YYYY-MM-DD');
        let addDays = moment(weekStartDate).add(6, 'days').format('YYYY-MM-DD');

        let weekLastDate = moment(addDays).isAfter(weekEndDate)
          ? weekEndDate.format('YYYY-MM-DD')
          : addDays;

        let liveWeek = moment().isBetween(
          weekStartDate,
          weekEndDate,
          undefined,
          '[]',
        );

        let checkDays = moment(weekLastDate).diff(
          moment(weekStartDate),
          'days',
        );

        if (checkDays <= 3 && formattedWeeks.length > 0) {
          formattedWeeks[formattedWeeks.length - 1] = {
            ...formattedWeeks[formattedWeeks.length - 1],
            label: `${moment(
              formattedWeeks[formattedWeeks.length - 1].fromDate,
            ).format('Do MMM')} - ${moment(weekLastDate).format('Do MMM')}`,
            toDate: weekLastDate,
            value: `${
              formattedWeeks[formattedWeeks.length - 1].fromDate
            } ${weekLastDate}`,
          };
        } else {
          let obj = {
            label: `${moment(weekStartDate).format('Do MMM')} - ${moment(
              weekLastDate,
            ).format('Do MMM')}`,
            value: `${weekStartDate} ${weekLastDate}`,
            fromDate: weekStartDate,
            toDate: weekLastDate,
          };

          if (isLiveEvent) {
            if (!liveWeek) break;
            formattedWeeks.push(obj);
          } else {
            formattedWeeks.push(obj);
          }

          weekInitialDate = moment(weekLastDate).add(1, 'days');
        }
      }

      formattedWeeks.reverse();
      dropdownDates.push(...formattedWeeks);

      if (
        eventId !== 530 &&
        eventId !== 1989 &&
        endDate.isSameOrAfter(moment()) &&
        eventData?.activities &&
        eventData.activities[0]?.challengeParams !== 'STEPS'
      ) {
        dropdownDates.unshift(todays_date);
      }
    }
    return dropdownDates;
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white, padding: 20}}>
      <ProgramLeaderBoardScreenUI
        {...options}
        {...state}
        leaderBoardDetails={leaderBoardDetails}
        handleChange={handleChange}
        toggleDialog={toggleDialog}
        dialogVisible={dialogVisible}
        dropDownValue={dropDownValue}
        handleDropdownChange={handleDropdownChange}
        onApplyFilters={onApplyFilters}
        customDatesOptions={customDatesOptions}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
