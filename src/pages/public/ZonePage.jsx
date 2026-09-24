import { useParams, Navigate } from 'react-router'
import ZoneFilterTabs from "../../components/layout/ZoneFilterTabs"
import LabelTraitSimple from './../../components/ui/LabelTraitSimple';
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useState } from 'react';
import {zonesAPI, olAPI, contentAPI, memberAPI, eventAPI} from "../../services/api"
import EventCard from "../../components/ui/EventCard"
import ProfilePh from "../../images/profilePlaceHolder.jpeg"
import Pagination from "../../components/ui/Pagination"
import ContactInfoBlock from '@/components/ui/ContactInfoBlock';


const ZonePage = () => {
  const { zone } = useParams()
  const [zoneDetails, setZoneDetails] = useState(null);
  const [zonePsdDetails, setZonePsdDetails] = useState(null);
  const [OlListByZone, setOlListByZone] = useState([]);
  const [currentOl, setCurrentOl] = useState(null);
  const [currentOlContentList, setCurrentOlContentList] = useState([]);
  const [currentOlMemberList, setCurrentOlMemberList] = useState([]);
  const [currentEventList, setCurrentEventList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)

  // Loading flags — separate from "empty data" so skeletons only show
  // while a request is actually in flight.
  const [zoneLoading, setZoneLoading] = useState(true);
  const [psdLoading, setPsdLoading] = useState(true);
  const [olListLoading, setOlListLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);

  const PAGE_SIZE = 9
  const TOTAL_PAGES = currentEventList.length % PAGE_SIZE === 0 ? Math.floor(currentEventList.length / PAGE_SIZE) : Math.floor(currentEventList.length / PAGE_SIZE) + 1 || 1
  const events = currentEventList.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  // A skeleton shows both while a request is in flight AND when the
  // fetch finished but came back empty — it acts as a permanent
  // placeholder in that case, not just a loading spinner.
  const showZoneSkeleton = zoneLoading || !zoneDetails;
  const showPsdSkeleton = psdLoading || !zonePsdDetails;
  const showOlListSkeleton = olListLoading || OlListByZone.length === 0;
  const showContentSkeleton = contentLoading || currentOlContentList.length === 0;
  const showMapSkeleton = contentLoading || !currentOl?.mapImgUrl;
  const showMembersSkeleton = membersLoading || currentOlMemberList.length === 0;
  const showEventsSkeleton = eventsLoading || events.length === 0;
  const showContactSkeleton = contentLoading || !currentOl;


  useEffect(() => {
    setZoneDetails(null);
    setZonePsdDetails(null);
    setOlListByZone([]);
    setCurrentOl(null);
    setCurrentOlContentList([]);
    setCurrentOlMemberList([]);
    setCurrentEventList([]);
    setZoneLoading(true);
    setPsdLoading(true);
    setOlListLoading(true);
    setContentLoading(true);
    setMembersLoading(true);
    setEventsLoading(true);
}, [zone]);

 useEffect(() => {
  const fetchZoneDetails = async () => {
    setZoneLoading(true);
    try {
      // Replace with your API call or data fetching logic
      const res = await zonesAPI.getByZoneName(zone?.toUpperCase());
      setZoneDetails(res.data);
    } catch (error) {
      console.error("Error fetching zone details:", error);
    } finally {
      setZoneLoading(false);
    }
  };

  fetchZoneDetails();
 }, [zone]);

  // useEffect(() => {
  //   if (OlListByZone?.length > 0 && !currentOl) {
  //     setCurrentOl(OlListByZone[0]);
  //   }
  // }, [OlListByZone, currentOl]);

  useEffect(() => {
    const fetchCurrentOlContent = async () => {
      if (!currentOl?.id) {
        setCurrentOlContentList([]);
        setContentLoading(false);
        return;
      }

      setContentLoading(true);
      try {
        const res = await contentAPI.getAll(currentOl.id);
        setCurrentOlContentList(res.data);
      } catch (error) {
        console.error("Error fetching OL content:", error);
        setCurrentOlContentList([]);
      } finally {
        setContentLoading(false);
      }
    };

    const fetchCurrentOlMembers = async () => {
      if (!currentOl?.id) {
        setCurrentOlMemberList([]);
        setMembersLoading(false);
        return;
      }

      setMembersLoading(true);
      try {
        const res = await memberAPI.getAll(currentOl.id);
        setCurrentOlMemberList(res.data);
      } catch (error) {
        console.error("Error fetching OL members:", error);
        setCurrentOlMemberList([]);
      } finally {
        setMembersLoading(false);
      }
    };

    const fetchCurrentEventList = async () => {
      if (!currentOl?.id) {
        setCurrentEventList([]);
        setEventsLoading(false);
        return;
      }

      setEventsLoading(true);
      try {
        const res = await eventAPI.getAllByOl(currentOl.id);
        setCurrentEventList(res.data);
      } catch (error) {
        console.error("Error fetching OL events:", error);
        setCurrentEventList([]);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchCurrentOlContent();
    fetchCurrentOlMembers();
    fetchCurrentEventList();
}, [currentOl]);

  useEffect(() => {
    const fetchZonePsdDetails = async () => {
      if (!zoneDetails?.id) {
        setZonePsdDetails(null);
        setPsdLoading(false);
        return;
      }

      setPsdLoading(true);
      try {
        const res = await zonesAPI.getPsdByZoneId(zoneDetails.id);
        setZonePsdDetails(res.data);
      } catch (error) {
        console.error("Error fetching zone president details:", error);
        setZonePsdDetails(null);
      } finally {
        setPsdLoading(false);
      }
    };

    fetchZonePsdDetails();
}, [zoneDetails?.id]);

useEffect(() => {
  const fetchOlListByZone = async () => {
    if (!zoneDetails?.id) return;

    setOlListLoading(true);
    try {
      const res = await olAPI.getAll(zoneDetails.id);

      setOlListByZone(res.data);
      setCurrentOl(res.data?.[0] || null);
    } catch (error) {
      console.error("Error fetching OL list by zone:", error);
      setOlListByZone([]);
      setCurrentOl(null);
    } finally {
      setOlListLoading(false);
    }
  };

  fetchOlListByZone();
}, [zoneDetails?.id]);

  return (
    <div className='min-h-screen font-poppins flex flex-col items-start pt-25 pb-10 px-6 lg:pl-33 lg:pr-20 bg-jci-black gap-2'>
      <ZoneFilterTabs />

      <div className="flex flex-col gap-0 lg:ml-20 lg:mr-1 mr-0 md:w-[90%] w-full ">
        <div className="flex lg:flex-col flex-col md:justify-center md:items-center lg:items-start bg-jci-white gap-5 rounded w-full  p-2  "  >

          {/** Zone banner — skeleton while loading, and while empty */}
          {showZoneSkeleton ? (
            <div className="flex flex-col gap-4 items-start w-full h-[40vh] p-5 bg-gray-200 animate-pulse rounded">
              <div className="h-3 w-24 bg-gray-300 rounded"></div>
              <div className="h-8 w-2/3 bg-gray-300 rounded mt-auto"></div>
            </div>
          ) : (
            <div
              className=" group flex flex-col gap-4 items-start w-full h-[40vh] p-5 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0),rgba(0, 0, 0, 0), #0e0b21), url(${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${zoneDetails?.imgUrl})`
              }}
            >
              <LabelTraitSimple Label="présentation" H1Text={zoneDetails?.name} H1Color="text-jci-white" LabelColor="text-jci-teal"/>
            </div>
          )}

          {/** Zone president block — skeleton while loading, and while empty */}
          {showPsdSkeleton ? (
            <div className='relative lg:pl-15 px-3 items-end gap-3 lg:px-0 w-full'>
              <div className='absolute border-4 bg-white border-jci-white rounded-2xl -top-15'>
                <div className="aspect-[50/50] w-30 rounded-xl bg-gray-300 animate-pulse" />
              </div>
              <div className='flex flex-col gap-2 items-start lg:ml-38 lg:mt-0 mt-20'>
                <div className="h-4 w-40 bg-gray-300 rounded animate-pulse" />
                <div className="h-3 w-full max-w-md bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-3/4 max-w-md bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ) : (
            <div className='relative lg:pl-15 px-3 items-end gap-3 lg:px-0'>
              <div className='absolute border-4 bg-white border-jci-white rounded-2xl -top-15'>
                <img src={import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE + zonePsdDetails?.imgUrl} alt={`Vice president zone ${zoneDetails?.name}`} className="aspect-[50/50] w-30 rounded-xl object-cover" loading="lazy" />
              </div>
              <div className='flex flex-col gap-1 items-start lg:ml-38 lg:mt-0 mt-20'>
                <h1 className='text-[16px] font-poppins font-normal text-jci-black flex flex-row items-center justify-between w-full'>
                  {zonePsdDetails?.name}
                  <div className="md:hidden flex"> <a href={`tel:${zonePsdDetails?.contact}`}
                    className=' flex flex-row py-1 rounded-xl bg-black/90 text-jci-white gap-2 text-[12px] items-center px-2 mb-1'
                    > <RiSendPlaneFill size={16} className="" />Contact</a>
                  </div>
                </h1>
                <p className='text-jci-black/50 text-[12px] text-justify'>
                  {zonePsdDetails?.quote}
                </p>

              </div>
            </div>
          )}

          {/** OL tabs — skeleton while loading, and while empty */}
          <div className='flex flex-row  md:w-[90%] w-full lg:ml-15 justify-between md:border-b border-b-gray-400 px-5 py-0 lg:px-0'>
            {showOlListSkeleton ? (
              <div className='md:flex md:flex-row gap-5 grid grid-cols-3 items-center w-full'>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-3 w-16 bg-gray-300 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <div className='md:flex  md:flex-row gap-5 grid grid-cols-3 items-end'>
                  {OlListByZone?.map((ol) =>
                    currentOl?.id === ol.id ? (
                      <h2
                        key={ol.id}
                        className="text-[12px] font-poppins font-semibold text-jci-blue border-b-4 border-b-jci-blue"
                        onClick={() => setCurrentOl(ol)}
                      >
                        JCI {ol.name}
                      </h2>
                    ) : (
                      <h2
                        key={ol.id}
                        className="text-[12px] font-poppins font-semibold text-jci-black hover:text-jci-blue hover:cursor-pointer hover:border-b-4 hover:border-b-jci-blue transition-all duration-300"
                        onClick={() => setCurrentOl(ol)}
                      >
                        JCI {ol.name}
                      </h2>
                    )
                  )}
              </div>
            )}
            <div className="hidden md:flex"> <a href={`tel:${zonePsdDetails?.contact}`}
              className=' flex flex-row py-1 rounded-xl bg-black/90 text-jci-white gap-2 text-[12px] items-center px-2 mb-1'
              > <RiSendPlaneFill size={16} className="" />Contact</a>
            </div>
          </div>

          {/** OL content + map — skeleton while loading, and while empty */}
          <div className='flex flex-col lg:flex-row gap-5 md:w-[90%] w-full lg:ml-15 px-3 lg:px-0'>
            <div className='flex flex-col flex-2 gap-2'>
              {showContentSkeleton ? (
                [0, 1, 2].map((i) => (
                  <div key={i} className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                ))
              ) : (
                currentOlContentList?.map((content) => (
                  <p key={content.id} className='text-[12px] font-normal text-jci-black/70 text-justify'>
                    {content.content}
                  </p>
                ))
              )}
            </div>
            <div className="flex-1  flex items-start justify-start">
              {showMapSkeleton ? (
                <div className="w-full h-100 bg-gray-200 rounded animate-pulse" />
              ) : (
                <img src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${currentOl?.mapImgUrl}`} alt={`Logo ${currentOl?.name}`} className=" w-full h-100 object-contain " />
              )}
            </div>

          </div>
          <div className='group  lg:w-[90%] lg:ml-15 w-full ml-0 px-3 lg:px-0 -mt-10'>
            <LabelTraitSimple Label="listes" H1Text="Les membres du bureau local" H1Color="text-jci-black" LabelColor="text-jci-teal"/>
          </div>

          {/** Section for displaying the members of the local office */}
          <div className='flex flex-col lg:flex-row gap-1 lg:w-[90%] lg:ml-15 w-full ml-0 px-3 lg:px-0'>
            {/** Section for displaying the President*/}
            <div className={`flex flex-1 ${showMembersSkeleton ? 'animate-pulse' : ''}`}>
              <div className='relative p-2 border-[#F9F9F9] bg-[#F9F9F9] w-full'>
                <div className="w-[60%]  aspect-square rounded-full border border-jci-black/30 ">
                  <div className="w-full aspect-square rounded-full  border-[8px] border-[#E0F8F7]">
                    <div className="w-full aspect-square rounded-full border-[2px] border-green-900 overflow-hidden">
                      {showMembersSkeleton ? (
                        <div className="w-full h-full bg-gray-300" />
                      ) : (
                        <img
                            src={`${currentOlMemberList.length > 0 ? `${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${currentOlMemberList?.[0]?.imgUrl}` : ProfilePh}`}
                              alt={`Profile picture of ${currentOlMemberList?.[0]?.name}`}
                              className="w-full h-full object-cover rounded-full hover:scale-105 transition-all duration-300"
                              loading="lazy"
                          />
                      )}
                    </div>
                  </div>
                </div>
                <div className=" top-2 right-2 px-3 uppercase md:px-2 py-0.5 bg-jci-yellow text-[7px] md:text-[9px] text-jci-black font-extrabold font-roboto text-center absolute ">
                  { !showMembersSkeleton ? currentOlMemberList?.[0]?.ticket : <div className='h-2 w-5 bg-gray-300 rounded'></div>}
                </div>
                <div className=" absolute bottom-1 right-2 flex flex-col justify-center gap-[0.5px]">
                  { !showMembersSkeleton ? <p className='text-[12px] font-bold text-jci-black'>{currentOlMemberList?.[0]?.name}</p>: <div className=' bg-gray-300 h-4 w-20 rounded'></div>}
                  { !showMembersSkeleton ? <p className='text-[12px] font-semibold text-jci-black/60'>{currentOlMemberList?.[0]?.title}</p>: <div className=' bg-gray-300 h-4 w-25 rounded mt-1'></div>}
                </div>
              </div>
            </div>
            {/** Section for displaying the rest of member */}
            <div className=' flex-1 lg:flex-2 grid lg:grid-cols-2 grid-cols-1 gap-1'>
              {showMembersSkeleton ? (
                [0, 1, 2, 3].map((i) => (
                  <div key={i} className='relative flex flex-col gap-1 p-2 border border-[#F9F9F9] bg-[#F9F9F9] h-fit animate-pulse'>
                    <div className="flex flex-row gap-3">
                      <div className="rounded-full border-2 border-gray-300 h-10 w-10 bg-gray-300"></div>
                      <div className="flex flex-col justify-center gap-1">
                        <div className="h-3 w-20 bg-gray-300 rounded"></div>
                        <div className="h-2 w-14 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                currentOlMemberList?.slice(1).map((member) => (
                <div key={member?.id} className='relative flex flex-col gap-1 p-2 border border-[#F9F9F9] bg-[#F9F9F9]  h-fit'>
                  <div className="flex flex-row gap-3">
                    <div className=" ">
                      <div className="rounded-full border-2 border-green-500">
                        <img src={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${member?.imgUrl}`} alt={member.name} className="h-10 w-10 rounded-full object-cover" loading="lazy"/>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-[0.5px]">
                      <p className='text-[12px] font-bold text-jci-black'>{member.name}</p>
                      <p className='text-[11px] font-normal text-jci-black/50'>{member.title}</p>
                    </div>
                  </div>
                  <div className="px-3 md:px-2 py-0.5 bg-jci-yellow text-[7px] md:text-[9px] text-jci-black font-extrabold font-roboto text-center absolute bottom-1 right-0">
                    {member.ticket}
                  </div>
                </div>
              ))
              )}
            </div>

          </div>
          {/** Section for displaying the Ol events */}
          <div className='group  lg:w-[90%] lg:ml-15 w-full ml-0 mt-5 px-3 lg:px-0'>
            <LabelTraitSimple Label="listes des projets locaux" H1Text="Les projets locaux" H1Color="text-jci-black" LabelColor="text-jci-teal"/>
          </div>
          <div className='flex flex-col  gap-1 lg:w-[90%] lg:ml-15 w-full ml-0 mb-10 px-3 lg:px-0'>
            {showEventsSkeleton ? (
              <div className='hidden sm:grid  sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 w-fit self-center lg:w-full max-w-6xl grid-cols-1'>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-full h-56 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <div className='hidden sm:grid  sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 w-fit self-center lg:w-full max-w-6xl grid-cols-1'>
                {events?.map((event) => {
                  const date = new Date(event?.date);
                  const day = date.getDate();
                  const month = date.toLocaleString('default', { month: 'short' });
                  const year = date.getFullYear();
                  return (
                    <EventCard key={event?.id} Img={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${event?.imgUrl}`} Title={event?.title} Content={event?.content} Day={day} Month={month} Type={event?.type} Year={year} Id={event?.id} />
                  )
                })}
              </div>
            )}

            {showEventsSkeleton ? (
              <div className='sm:hidden flex w-full justify-center'>
                <div className="w-full h-56 bg-gray-200 rounded animate-pulse" />
              </div>
            ) : (
              <div className='sm:hidden flex flex-row overflow-x-scroll snap-x snap-mandatory self-center lg:w-full max-w-6xl'>
                  {events?.map((event) => {
                    const date = new Date(event?.date);
                    const day = date.getDate();
                    const month = date.toLocaleString('default', { month: 'short' });
                    const year = date.getFullYear();
                    return (
                      <div key={event?.id} className='snap-center shrink-0 w-full flex justify-center'>
                        <EventCard
                          Img={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${event?.imgUrl}`}
                          Title={event?.title}
                          Content={event?.content}
                          Day={day}
                          Month={month}
                          Type={event?.type}
                          Year={year}
                          Id={event?.id}
                        />
                      </div>
                    )
                  })}
                </div>
            )}
            <div className='flex justify-center w-full mt-5'>
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={TOTAL_PAGES}
              />
            </div>
            {showContactSkeleton ? (
              <div className="w-full h-24 bg-gray-200 rounded animate-pulse" />
            ) : (
              <ContactInfoBlock Title="Coordonnées" Address={currentOl?.localisation} Phone={currentOl?.phone} Email={currentOl?.email} Img={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${currentOl?.logoImgUrl}`} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZonePage