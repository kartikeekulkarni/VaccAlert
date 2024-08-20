import React from 'react';

const AboutVaccineComponent = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">About Vaccination</h2>
      
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4 className="card-title">1) What is Vaccination?</h4>
          <p className="card-text">
            Vaccination is the administration of antigenic material (a vaccine) to stimulate an individual's immune system to develop adaptive immunity to a pathogen. Vaccines can prevent or ameliorate morbidity from infection. Vaccination is the most effective method of preventing infectious diseases. Widespread immunity due to vaccination is largely responsible for the worldwide eradication of smallpox and the restriction of diseases such as polio, measles, and tetanus from much of the world.
          </p>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4 className="card-title">2) How do Vaccines function?</h4>
          <p className="card-text">
            The process of artificial induction of immunity works by 'priming' the immune system with an 'immunogen'. Stimulating immune responses with an infectious agent is known as immunization. Vaccination includes various ways of administering immunogens. Most vaccines are given by hypodermic injection as they are not absorbed reliably through the intestines. Some vaccines are given orally to produce immunity in the bowel. While vaccination provides a lasting effect, it usually takes several weeks to develop, while passive immunity (the transfer of antibodies) has an immediate effect.
          </p>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4 className="card-title">3) How are Vaccines administered?</h4>
          <p className="card-text">
            Vaccines may be administered orally, by injection (intramuscular, intradermal, subcutaneous), by puncture, transdermal, or intranasal. Several recent clinical trials have aimed to deliver vaccines via mucosal surfaces to be up-taken by the common mucosal immunity system, thus avoiding the need for injections.
          </p>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4 className="card-title">4) What is the Indian scenario in Vaccination?</h4>
          <p className="card-text">
            2.7 Crore children are born in India every year. Approximately 18.3 lakhs children die before their fifth birthday. India records 5 lakh child deaths annually due to vaccine preventable diseases. Despite high childhood mortality rates, 30 percent of Indian children miss the benefits of full immunization every year. One out of every 3 children in India does not receive all vaccines that are available under UIP. The Government of India recognizes immunization as one of the most cost-effective interventions to prevent child deaths.
          </p>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4 className="card-title">5) What is Mission Indradhanush?</h4>
          <p className="card-text">
            Mission Indradhanush was launched on 25th December 2014 with an aim to cover all those children who are partially vaccinated or unvaccinated. Mission Indradhanush is a nationwide initiative with a special focus on 201 high-focus districts. These districts account for nearly 50% of the total partially vaccinated or unvaccinated children in the country.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutVaccineComponent;
