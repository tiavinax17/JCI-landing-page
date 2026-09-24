
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  CreditCard,
  Truck,
  FileText,
  RotateCcw,
  ShieldCheck,
  Mail,
} from "lucide-react";

const ConditionsGeneralesVentePage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      number: "01",
      title: "Objet et champ d'application",
      icon: FileText,
      content: (
        <>
          <p>
            Les présentes Conditions Générales de Vente définissent les
            conditions applicables aux ventes de produits et, le cas échéant,
            aux prestations proposées par JCI Madagascar sur son site
            internet.
          </p>

          <p className="mt-5">
            Elles s'appliquent à toute commande effectuée par l'intermédiaire
            du site et précisent les droits et obligations de JCI Madagascar
            ainsi que ceux du client.
          </p>

          <p className="mt-5">
            Toute commande effectuée sur le site implique la prise de
            connaissance et l'acceptation des présentes conditions.
          </p>
        </>
      ),
    },

    {
      number: "02",
      title: "Produits et services proposés",
      icon: ShoppingBag,
      content: (
        <>
          <p>
            Les produits et services proposés à la vente sont présentés sur le
            site avec les informations disponibles au moment de leur
            publication.
          </p>

          <p className="mt-5">
            JCI Madagascar s'efforce de fournir des descriptions, photographies
            et informations permettant au client d'identifier clairement le
            produit ou service proposé.
          </p>

          <p className="mt-5">
            Les produits sont proposés dans la limite de leur disponibilité.
            En cas d'indisponibilité après la commande, le client pourra être
            informé dans les meilleurs délais.
          </p>
        </>
      ),
    },

    {
      number: "03",
      title: "Prix",
      icon: CreditCard,
      content: (
        <>
          <p>
            Les prix des produits ou services sont indiqués sur le site au
            moment de leur présentation.
          </p>

          <p className="mt-5">
            Le prix applicable à une commande est celui affiché au moment de
            sa validation, sous réserve d'erreur manifeste.
          </p>

          <p className="mt-5">
            Les éventuels frais supplémentaires, notamment les frais de
            livraison, sont indiqués au client avant la validation définitive
            de la commande lorsqu'ils sont applicables.
          </p>

          <p className="mt-5">
            JCI Madagascar se réserve le droit de modifier ses prix à tout
            moment. Les modifications ne s'appliquent pas aux commandes déjà
            validées, sauf disposition contraire prévue par la réglementation
            applicable.
          </p>
        </>
      ),
    },

    {
      number: "04",
      title: "Commande",
      icon: ShoppingBag,
      content: (
        <>
          <p>
            Le client sélectionne les produits ou services qu'il souhaite
            commander et fournit les informations nécessaires au traitement de
            sa commande.
          </p>

          <p className="mt-5">
            Avant la validation, le client est invité à vérifier les
            informations relatives à sa commande, notamment les produits, les
            quantités, les coordonnées et le montant total.
          </p>

          <p className="mt-5">
            La commande est considérée comme validée lorsque le client a
            effectué les étapes prévues à cet effet sur le site.
          </p>

          <p className="mt-5">
            Une confirmation peut être envoyée au client par courrier
            électronique ou par tout autre moyen de communication disponible.
          </p>
        </>
      ),
    },

    {
      number: "05",
      title: "Modalités de paiement",
      icon: CreditCard,
      content: (
        <>
          <p>
            Le paiement est effectué selon les moyens de paiement proposés sur
            le site au moment de la commande.
          </p>

          <p className="mt-5">
            Les informations relatives au paiement peuvent être traitées par
            un prestataire de paiement lorsque celui-ci est utilisé.
          </p>

          <p className="mt-5">
            JCI Madagascar ne demande pas au client de communiquer ses
            informations bancaires par courrier électronique ou par un moyen
            de communication non sécurisé.
          </p>

          <p className="mt-5">
            Une commande peut être suspendue ou annulée lorsque le paiement
            requis n'est pas effectué ou lorsque celui-ci ne peut pas être
            confirmé.
          </p>
        </>
      ),
    },

    {
      number: "06",
      title: "Livraison et retrait",
      icon: Truck,
      content: (
        <>
          <p>
            Lorsque la commande concerne un produit nécessitant une livraison,
            celui-ci est envoyé à l'adresse communiquée par le client lors de
            la commande.
          </p>

          <p className="mt-5">
            Les modalités, zones et éventuels frais de livraison sont indiqués
            au client avant la validation de la commande lorsqu'ils sont
            applicables.
          </p>

          <p className="mt-5">
            Lorsque le retrait est proposé, les modalités et les conditions de
            retrait sont communiquées au client lors de la commande.
          </p>

          <p className="mt-5">
            Les délais de livraison peuvent varier selon le produit, la
            disponibilité, le lieu de destination et les conditions du
            transporteur.
          </p>
        </>
      ),
    },

    {
      number: "07",
      title: "Annulation et modification",
      icon: RotateCcw,
      content: (
        <>
          <p>
            Toute demande d'annulation ou de modification d'une commande doit
            être effectuée dans les meilleurs délais.
          </p>

          <p className="mt-5">
            Une demande de modification peut ne plus être possible lorsque la
            commande a déjà été préparée, expédiée ou exécutée.
          </p>

          <p className="mt-5">
            Les conditions d'annulation peuvent varier selon la nature du
            produit ou du service commandé et selon la réglementation
            applicable.
          </p>
        </>
      ),
    },

    {
      number: "08",
      title: "Retours et remboursements",
      icon: RotateCcw,
      content: (
        <>
          <p>
            Lorsqu'un retour ou un remboursement est applicable, les modalités
            correspondantes sont communiquées au client en fonction de la
            nature de la commande.
          </p>

          <p className="mt-5">
            En cas de produit défectueux, de produit non conforme à la commande
            ou d'erreur imputable à JCI Madagascar, le client est invité à
            contacter l'organisation dans les meilleurs délais.
          </p>

          <p className="mt-5">
            Les remboursements, lorsqu'ils sont dus, sont effectués selon les
            modalités et délais applicables au moyen de paiement utilisé ou
            selon toute autre modalité convenue avec le client.
          </p>
        </>
      ),
    },

    {
      number: "09",
      title: "Responsabilité",
      icon: ShieldCheck,
      content: (
        <>
          <p>
            JCI Madagascar s'engage à fournir les produits et services
            conformément aux informations présentées sur le site et aux
            conditions applicables à la commande.
          </p>

          <p className="mt-5">
            JCI Madagascar ne saurait être tenue responsable des dommages
            résultant d'un événement indépendant de sa volonté, d'une
            utilisation inappropriée du produit ou d'une interruption
            technique échappant raisonnablement à son contrôle.
          </p>

          <p className="mt-5">
            Cette limitation s'applique sous réserve des droits dont bénéficie
            le client en vertu des dispositions légales applicables.
          </p>
        </>
      ),
    },

    {
      number: "10",
      title: "Données personnelles",
      icon: ShieldCheck,
      content: (
        <>
          <p>
            Les informations personnelles communiquées lors d'une commande
            peuvent être utilisées afin de traiter celle-ci, assurer sa
            livraison ou son exécution et permettre la gestion de la relation
            avec le client.
          </p>

          <p className="mt-5">
            Les données personnelles sont traitées conformément à la Politique
            de Confidentialité du site.
          </p>

          <p className="mt-5">
            Pour plus d'informations concernant la collecte, l'utilisation, la
            conservation et la protection des données personnelles, veuillez
            consulter la page dédiée à la Politique de Confidentialité.
          </p>
        </>
      ),
    },

    {
      number: "11",
      title: "Propriété intellectuelle",
      icon: FileText,
      content: (
        <p>
          Les éléments du site, notamment les textes, photographies,
          illustrations, logos, graphismes et contenus associés aux produits ou
          services, restent protégés par les règles applicables en matière de
          propriété intellectuelle.
          <br />
          <br />
          L'achat d'un produit ou d'un service ne constitue pas une cession des
          droits de propriété intellectuelle attachés au site ou à ses
          contenus.
        </p>
      ),
    },

    {
      number: "12",
      title: "Réclamations et litiges",
      icon: ShieldCheck,
      content: (
        <>
          <p>
            Pour toute question ou réclamation concernant une commande, le
            client est invité à contacter JCI Madagascar afin de rechercher
            une solution amiable.
          </p>

          <p className="mt-5">
            À défaut de résolution amiable, le différend sera traité
            conformément au droit et aux règles de compétence applicables à
            Madagascar.
          </p>
        </>
      ),
    },

    {
      number: "13",
      title: "Modification des CGV",
      icon: FileText,
      content: (
        <p>
          JCI Madagascar peut modifier les présentes Conditions Générales de
          Vente afin de tenir compte de l'évolution de ses activités, de ses
          services ou de la réglementation applicable.
          <br />
          <br />
          Les conditions applicables à une commande sont celles acceptées par
          le client au moment de sa validation.
        </p>
      ),
    },

    {
      number: "14",
      title: "Contact",
      icon: Mail,
      content: (
        <>
          <p>
            Pour toute question concernant une commande, un produit, un
            service ou les présentes Conditions Générales de Vente, vous pouvez
            contacter JCI Madagascar.
          </p>

          <div className="mt-6 rounded-2xl bg-jci-black p-6 text-white">
            <p className="font-poppins text-sm font-semibold">
              JCI Madagascar
            </p>

            <p className="mt-2 font-poppins text-sm text-white/65">
              Ambatonakanga, Madagascar
            </p>

            <a
              href="mailto:contact@jcimada.org"
              className="mt-3 inline-flex items-center gap-2 font-poppins text-sm text-jci-yellow transition-opacity hover:opacity-80"
            >
              <Mail size={16} />
              contact@jcimada.org
            </a>
          </div>
        </>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-white text-jci-black">
      {/* HERO */}
      <section className="relative overflow-hidden bg-jci-black lg:pl-35 lg:mr-1 ml-0 pl-0">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[30px] border-jci-blue/20" />

        <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full border-[25px] border-jci-yellow/20" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 lg:px-12 lg:pb-20 lg:pt-28">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-[3px] w-12 bg-jci-yellow" />

              <span className="font-poppins text-xs font-semibold uppercase tracking-[0.22em] text-jci-yellow">
                Informations commerciales
              </span>
            </div>

            <h1 className="font-poppins text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-7xl">
              Conditions
              <br />
              <span className="text-jci-blue">Générales</span>
              <br />
              de Vente
            </h1>

            <p className="mt-7 max-w-2xl font-poppins text-sm leading-7 text-white/65 sm:text-base">
              Retrouvez les conditions applicables aux produits et services
              proposés par JCI Madagascar sur son site.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-jci-blue" />
              <div className="h-2 w-2 rounded-full bg-jci-yellow" />
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto w-full px-5 py-14 sm:px-8 lg:px-12 lg:py-20 lg:pl-60 lg:mr-1 ml-0 p5 ">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-10 bg-jci-blue" />

              <span className="font-poppins text-xs font-bold uppercase tracking-[0.2em] text-jci-blue">
                Vente
              </span>
            </div>

            <h2 className="mt-5 font-poppins text-3xl font-bold leading-tight sm:text-4xl">
              Des conditions
              <br />
              <span className="text-jci-blue">claires et transparentes</span>
            </h2>
          </div>

          <div className="font-poppins text-sm leading-7 text-black/65 sm:text-base">
            <p>
              Les présentes Conditions Générales de Vente encadrent les
              relations entre JCI Madagascar et ses clients dans le cadre des
              ventes réalisées par l'intermédiaire du site.
            </p>

            <p className="mt-5">
              Elles permettent de connaître les principales modalités
              applicables avant de passer une commande.
            </p>

            <div className="mt-8 border-l-4 border-jci-yellow bg-jci-yellow/10 px-5 py-4">
              <p className="text-sm font-semibold leading-6 text-jci-black">
                Dernière mise à jour : septembre 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-[#f7f8fa] lg:pl-50 lg:mr-1 ml-0 pl-0">
        <div className="mx-auto w-full px-5 py-14 sm:px-8 lg:py-20">
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-10 bg-jci-yellow" />

              <span className="font-poppins text-xs font-bold uppercase tracking-[0.2em] text-jci-black/50">
                Conditions commerciales
              </span>
            </div>

            <h2 className="mt-4 font-poppins text-2xl font-bold sm:text-3xl">
              Conditions Générales de Vente
            </h2>
          </div>

          <div className="space-y-3">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isOpen = openSection === index;

              return (
                <article
                  key={section.number}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-jci-blue shadow-lg shadow-jci-blue/5"
                      : "border-black/5"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(index)}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-poppins text-xs font-bold transition-colors ${
                        isOpen
                          ? "bg-jci-blue text-white"
                          : "bg-jci-black text-white"
                      }`}
                    >
                      {section.number}
                    </span>

                    <Icon
                      size={18}
                      className={`hidden shrink-0 sm:block ${
                        isOpen ? "text-jci-blue" : "text-black/30"
                      }`}
                    />

                    <span className="flex-1 font-poppins text-sm font-semibold sm:text-base">
                      {section.title}
                    </span>

                    {isOpen ? (
                      <ChevronUp
                        size={20}
                        className="shrink-0 text-jci-blue"
                      />
                    ) : (
                      <ChevronDown
                        size={20}
                        className="shrink-0 text-black/40"
                      />
                    )}
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-black/5 px-5 pb-7 pt-6 sm:px-7 sm:pl-[6.75rem]">
                        <div className="font-poppins text-sm leading-7 text-black/65 sm:text-[15px]">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM */}
      <section className="bg-jci-blue lg:pl-45 lg:mr-1 ml-0 pl-0">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="font-poppins text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                JCI Madagascar
              </p>

              <h2 className="mt-3 max-w-2xl font-poppins text-2xl font-bold text-white sm:text-3xl">
                Une relation fondée sur la confiance.
              </h2>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-jci-yellow text-jci-black">
              <ShoppingBag size={24} />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default ConditionsGeneralesVentePage;

