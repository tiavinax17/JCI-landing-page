import SubNav from "../../components/layout/SubNav";
import LabelTraitSimple from "../../components/ui/LabelTraitSimple";
import BNCard from "../../components/ui/BNCard";
import { useState, useEffect } from "react";
import { bnAPI } from "../../services/api.js";
import { toast } from "sonner";

const BureauNationalPage = () => {
  const [bnList, setBnList] = useState([]);

  useEffect(() => {
    const fetchBureauNational = async () => {
      try {
        const res = await bnAPI.getAll();
        setBnList(res.data);
      } catch (error) {
        console.error("Error fetching Bureau National list:", error);
        toast.error("Error fetching Bureau National list");
      }
    };

    fetchBureauNational();
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden font-poppins flex flex-col items-start pt-25 pb-10 px-6 lg:pl-33 lg:pr-10 bg-jci-black gap-2">

      <SubNav />

      <div className="group flex flex-col gap-0 w-[94%] min-w-0 lg:ml-20 lg:mr-1">

        {/* HEADER */}
        <div className="flex flex-col bg-jci-white gap-2 rounded-t-xl px-6 sm:px-10 pt-5 lg:pr-20">
          <LabelTraitSimple
            Label="LES MEMBRES DU"
            H1Text="BUREAU NATIONAL 2026"
          />

          <p className="text-[12px] font-normal font-poppins text-jci-black text-justify">
            Découvrez les membres du Bureau National 2026 de la JCI Madagascar.
            Une équipe engagée de jeunes leaders dédiée à la conduite des
            projets stratégiques, au renforcement des compétences et à la
            création d'impacts positifs à travers toutes les organisations
            locales de la Grande Île.
          </p>
        </div>

        {/* MEMBRES */}
        <div className="flex flex-col  rounded-b-xl py-10 -mt-1 w-full min-w-0 bg-jci-white md:px-10 px-5 ">

          {/* ================= MOBILE ================= */}
          <div className="sm:hidden w-full min-w-0 overflow-hidden">
            <div className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide">

              {bnList.length > 0 ? (
                bnList.map((member) => (
                  <div
                    key={member.id}
                    className="shrink-0 w-full min-w-0 snap-center snap-always px-6"
                  >
                    <BNCard
                      image={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${member.imgUrl}`}
                      firstName={member.firstName}
                      lastName={member.name}
                      role={member.title}
                    />
                  </div>
                ))
              ) : (
                <div className="shrink-0 w-full min-w-0 px-6">
                  <div className="w-full p-3 pb-2 border border-gray-400/50 rounded-xl flex flex-col justify-between bg-gray-200 animate-pulse">

                    <div className="flex flex-col justify-center items-center">

                      <div className="w-[95%] aspect-square rounded-full border border-jci-black/30">

                        <div className="w-full aspect-square rounded-full border-gray-300 border-[8px]">

                          <div className="w-full aspect-square rounded-full border-[2px] border-jci-black/40 overflow-hidden">
                            <img
                              src=""
                              alt=""
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>

                        </div>

                      </div>

                      <div className="text-center text-[clamp(10px,1.2vw,15px)] flex flex-col gap-0 text-jci-black font-poppins">

                        <div className="h-4 bg-gray-300 rounded w-30 mx-auto"></div>

                        <div className="h-4 bg-gray-400 rounded w-30 mx-auto mt-1"></div>

                      </div>

                    </div>

                    <div className="h-4 bg-gray-400 rounded w-30 mx-auto mt-1"></div>

                  </div>
                </div>
              )}

            </div>
          </div>


          {/* ================= TABLET / DESKTOP ================= */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-3 w-fit  lg:w-full   0">

            {bnList.length > 0 ? (
              bnList.map((member) => (
                <BNCard
                  key={member.id}
                  image={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${member.imgUrl}`}
                  firstName={member.firstName}
                  lastName={member.name}
                  role={member.title}
                />
              ))
            ) : (
              <div className="w-full p-3 pb-2 border border-gray-400/50 rounded-xl flex flex-col justify-between bg-gray-200 animate-pulse">

                <div className="flex flex-col justify-center items-center">

                  <div className="w-[95%] aspect-square rounded-full border border-jci-black/30">

                    <div className="w-full aspect-square rounded-full border-gray-300 border-[8px]">

                      <div className="w-full aspect-square rounded-full border-[2px] border-jci-black/40 overflow-hidden">
                        <img
                          src=""
                          alt=""
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>

                    </div>

                  </div>

                  <div className="text-center text-[clamp(10px,1.2vw,15px)] flex flex-col gap-0 text-jci-black font-poppins">

                    <div className="h-4 bg-gray-300 rounded w-30 mx-auto"></div>

                    <div className="h-4 bg-gray-400 rounded w-30 mx-auto mt-1"></div>

                  </div>

                </div>

                <div className="h-4 bg-gray-400 rounded w-30 mx-auto mt-1"></div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default BureauNationalPage;