const defaults = {
    appName:      "default",         // The default application name
    path:         "C:\\personas",     // Current Personas folder location
    ext:          ".persona",        // The common extention for personas data files
    blockExt:     ".pstore",         // Default Storage block extention .pstore
    root:         "root.persona",    // The root file naming convention
    system:       "system.persona",  // Used for storing non-user related data
    versionName:  "pstore.ver",      // Tracks storage block directory freshness
}
export { defaults }