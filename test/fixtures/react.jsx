function JSX() {
  return (
    <>
      <ParcelShopSelector
        nbResults={7}
        weight={3000}
        deliveryMode="24R"
        brandIdAPI="BDTEST"
        defaultCountry="FR"
        defaultPostcode="59000"
        allowedCountries="FR,BG"
        onParcelShopSelected={() => {
          console.log('Parcel shop selected')
        }}
        onParcelShopSelected2={() => {
          console.log('Parcel shop selected')
          console.log('Parcel shop selected')
          console.log('Parcel shop selected')
          console.log('Parcel shop selected')
        }}
      />

      <Carousel
        autoPlay
        infiniteLoop
        interval={6000}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        transitionTime={2000}
        showIndicators={false}
        className={constrainedStyles['max-constrained']}
      >
        {allImages.map((image, index) => (
          <Image
            priority
            src={image}
            width={4592}
            height={3064}
            alt="Hero image"
            className={styles.image}
            key={`hero_image_${index}`}
          />
        ))}
      </Carousel>

      <SearchIcon
        size={25}
        tabIndex={0}
        onClick={onClickSearchIcon}
        className={styles['search-icon']}
        color={isOpened ? 'black' : (iconColor ?? 'white')}
      />

      <dialog
        data-modal
        ref={modalRef}
        onClick={closeWhenClickedOutside}
        className={clsx(styles.dialog, params?.isDrawer && styles.invisible)}
      />
    </>
  )
}
